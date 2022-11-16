const app = require('./app');

//////////// sequelize connection //////////
// instantiate sequelize
const Sequelize = require('sequelize');
const { promiseImpl } = require('ejs');
const { Op } = require("sequelize");
const uuid = require('uuid');
options = { multi: true };
const moment = require('moment-timezone');
const { DataTypes } = require("sequelize");
const sequelize = require('sequelize');

// connect db
const db = new Sequelize("uni_media", "root", "penguen123", {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: 0,
    define: {
        timestamps: false,
        freezeTableName: true
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))
////////////////////////////////////////
const user = db.define('user', {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    mail: {
        type: Sequelize.STRING(50)
    },
    password: {
        type: Sequelize.STRING(50)
    },
    name: {
        type: Sequelize.STRING(50)
    },
    surname: {
        type: Sequelize.STRING(50)
    },
    school: {
        type: Sequelize.STRING(50)
    },
    department: {
        type: Sequelize.STRING(50)
    },
    entry_year: {
        type: Sequelize.STRING(20)
    },
    about: {
        type: Sequelize.STRING(200)
    },
    isConfirmed: {
        type: Sequelize.INTEGER
    },
    isConfirmed: {
        type: Sequelize.STRING(8000)
    },
    photo: {
        type: Sequelize.TEXT,
    },
    creation_time: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
});
// user.sync().then(() => {
//     console.log('user table created');
// });

const category = db.define('category', {
    category_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    category_name: {
        type: Sequelize.STRING(50)
    }
});
// category.sync().then(() => {
//     console.log('category table created');
// });

const post = db.define('post', {
    post_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    p_text: {
        type: Sequelize.STRING(500)
    },
    category_id: {
        type: Sequelize.INTEGER
    },
    p_vote: {
        type: Sequelize.INTEGER
    },
    creation_time: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
});
// post.sync().then(() => {
//     console.log('post table created');
// });

const comment = db.define('comment', {
    comment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    post_id: {
        type: Sequelize.INTEGER,
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    c_text: {
        type: Sequelize.STRING(140)
    },
    creation_time: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
});
// comment.sync().then(() => {
//     console.log('comment table created');
// });

const vote = db.define('vote', {
    vote_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    post_id: {
        type: Sequelize.INTEGER,
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    creation_time: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
});
// vote.sync().then(() => {
//     console.log('vote table created');
// });

user.hasMany(post, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks:true })
post.belongsTo(user, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks:true })

user.hasMany(comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks:true })
comment.belongsTo(user, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks:true })

post.hasMany(comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks:true })
comment.belongsTo(post, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks:true })

user.hasMany(vote, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks:true })
vote.belongsTo(user, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks:true })

post.hasMany(vote, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks:true })
vote.belongsTo(post, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks:true })

category.hasMany(post, {
    foreignKey: 'category_id',
    onDelete: 'cascade',
    hooks:true })
post.belongsTo(category, {
    foreignKey: 'category_id',
    onDelete: 'cascade',
    hooks:true })

const model = {

    async check_login(req,res) {

        const new_login = await user.findAll({
            raw: true,
            where: {
                [Op.and]: [
                    { mail: req.body.mail },
                    { password: req.body.password }
                ]
            },
        });

        return new_login;
    },

    async check_register (req,res) {	
        

        const new_user = await user.create({ 
                mail: req.body.mail,
                password: req.body.password,
                name: req.body.name,
                surname: req.body.surname,
                school: req.body.school,
                department: req.body.department,
                entry_year: req.body.entry_year,
                about: req.body.about
        });

        return new_user.dataValues;
    },

    async confirm_register (req,res) {	

        const confirm_user = await user.update( 
            { isConfirmed: 1 },
            { where: { mail: req.body.mail } }
        );

        return confirm_user;
    },
    
    async forum (req,res, decoded) {	

        var off_set = 0;
        if(req.body.offset){
            off_set = 5 * req.body.offset;
        }

        const forumPage = await post.findAll({  

            include: [
                {
                    model : user,
                    attributes : [[Sequelize.fn("concat", Sequelize.col('user.name'), " ", Sequelize.col('user.surname')), 'fullname']],

                },
                {
                    model : comment,
                    separate: true,
                    attributes : ['user_id', 'c_text', 'comment_id'],
                    include: [
                        {
                            model: user,
                            attributes : [[Sequelize.fn("concat", Sequelize.col('user.name'), " ", Sequelize.col('user.surname')), 'fullname']],
                        },
                    ],
                },
                {
                    model: vote,
                    separate: true,
                    attributes: ['user_id', 'vote_id'],
                    include: [
                        {
                            model: user,
                            attributes : [[Sequelize.fn("concat", Sequelize.col('user.name'), " ", Sequelize.col('user.surname')), 'fullname']],
                        },
                    ],
                },
            ],
            
            group: ['post.post_id'],
            order: [['post_id', 'DESC']],
            offset: off_set, // set the offset according your use case
            limit: 5  // limit the output
        });

        var returnVal = {
            "offset_info": off_set,
            "posts":forumPage
        }

        return returnVal;
    },

    async forum_category (req,res, decoded) {	

        var off_set = 0;
        if(req.body.offset){
            off_set = 5 * req.body.offset;
        }

        const forumPage_category = await post.findAll({  
            where: {
                category_id: req.body.category_id,
            },
            include: [
                {
                    model : user,
                    attributes : [[Sequelize.fn("concat", Sequelize.col('user.name'), " ", Sequelize.col('user.surname')), 'fullname']],

                },
                {
                    model : comment,
                    separate: true,
                    attributes : ['user_id', 'c_text', 'comment_id'],
                    include: [
                        {
                            model: user,
                            attributes : [[Sequelize.fn("concat", Sequelize.col('user.name'), " ", Sequelize.col('user.surname')), 'fullname']],
                        },
                    ],
                },
                {
                    model: vote,
                    separate: true,
                    attributes: ['user_id', 'vote_id'],
                    include: [
                        {
                            model: user,
                            attributes : [[Sequelize.fn("concat", Sequelize.col('user.name'), " ", Sequelize.col('user.surname')), 'fullname']],
                        },
                    ],
                },
            ],
            
            group: ['post.post_id'],
            order: [['post_id', 'DESC']],
            offset: off_set, // set the offset according your use case
            limit: 5  // limit the output
        });
        var returnVal = {
            "offset_info": off_set,
            "posts":forumPage_category
        }

        return returnVal;
    },

    async forum_search (req,res, decoded) {	

        var off_set = 0;
        if(req.body.offset){
            off_set = 5 * req.body.offset;
        }

        const forumPage_search = await post.findAll({  
            where: {
                p_text: {
                    [Op.like]: '%' + req.body.query + '%'
                }
            },
            include: [
                {
                    model : user,
                    attributes : [[Sequelize.fn("concat", Sequelize.col('user.name'), " ", Sequelize.col('user.surname')), 'fullname']],

                },
                {
                    model : comment,
                    separate: true,
                    attributes : ['user_id', 'c_text', 'comment_id'],
                    include: [
                        {
                            model: user,
                            attributes : [[Sequelize.fn("concat", Sequelize.col('user.name'), " ", Sequelize.col('user.surname')), 'fullname']],
                        },
                    ],
                },
                {
                    model: vote,
                    separate: true,
                    attributes: ['user_id', 'vote_id'],
                    include: [
                        {
                            model: user,
                            attributes : [[Sequelize.fn("concat", Sequelize.col('user.name'), " ", Sequelize.col('user.surname')), 'fullname']],
                        },
                    ],
                },
            ],
            
            group: ['post.post_id'],
            order: [['post_id', 'DESC']],
            offset: off_set, // set the offset according your use case
            limit: 5  // limit the output
        });

        var returnVal = {
            "offset_info": off_set,
            "posts":forumPage_search
        }

        return returnVal;
    },

    async forum_profile (req,res, decoded) {

        var off_set = 0;
        if(req.body.offset){
            off_set = 5 * req.body.offset;
        }
        
        const profile = await user.findAll({  
            where: {
                user_id: req.body.user_id,
            }
        });

        const forumPage_profile = await post.findAll({  
            where: {
                user_id : decoded.user_id

            },
            include: [
                {
                    model : user,
                    attributes : [[Sequelize.fn("concat", Sequelize.col('user.name'), " ", Sequelize.col('user.surname')), 'fullname']],

                },
                {
                    model : comment,
                    separate: true,
                    attributes : ['user_id', 'c_text', 'comment_id'],
                    include: [
                        {
                            model: user,
                            attributes : [[Sequelize.fn("concat", Sequelize.col('user.name'), " ", Sequelize.col('user.surname')), 'fullname']],
                        },
                    ],
                },
                {
                    model: vote,
                    separate: true,
                    attributes: ['user_id', 'vote_id'],
                    include: [
                        {
                            model: user,
                            attributes : [[Sequelize.fn("concat", Sequelize.col('user.name'), " ", Sequelize.col('user.surname')), 'fullname']],
                        },
                    ],
                },
            ],
            
            group: ['post.post_id'],
            order: [['post_id', 'DESC']],
            offset: off_set, // set the offset according your use case
            limit: 5  // limit the output
        });
        var returnVal = {
            "offset_info": off_set,
            "user_infos":profile,
            "user_posts":forumPage_profile
        }
                
        return returnVal;
    },

    async like_post (req,res, decoded) {

        return likePost = await vote.create({
            user_id: decoded.user_id,
            post_id: req.body.post_id,
        });   
    },

    async dislike_post (req,res, decoded) {	

        const dislikePost = await vote.destroy({

            where:{
                user_id: decoded.user_id,
                post_id: req.body.post_id,
            }
        });

        return dislikePost;
    },

    async new_post (req,res,decoded) {	

        const newPost = await post.create({
            user_id: decoded.user_id,
            p_text: req.body.p_text,
            category_id: req.body.category_id,
            p_vote: 0,
            raw: true,
        });

        return newPost;
    },

    async new_comment (req,res, decoded) {	

        const newComment = await comment.create({
            user_id: decoded.user_id,
            c_text: req.body.c_text,
            post_id: req.body.post_id,
            raw: true,
        });

        return newComment;
    },

    async add_photo (req,res,decoded) {	

        return addPhoto = await user.update(
            {
                photo: req.body.photo,
            },
            {
                where:{ 
                    user_id: decoded.user_id 
                },
            }
        );
    },

    async categories (req,res,decoded) {	

        const categories = await category.findAll({


            group: ['category.category_id'],
        
            order: [
                ['category_id', 'ASC'],
            ],

        });

        return categories;
    },

    async profile (req,res) {	

        const profile = await user.findAll({  
                where: {
                    user_id: req.body.user_id,
                }
        });

        return profile;
    },

    async update_profile (req,res, decoded) {	

        const updateProfile = await user.update(

            {
                entry_year: req.body.entry_year,
                department: req.body.department,
                about: req.body.about,
            },            
            {where: { 
                user_id: decoded.user_id 
            }},
        );
            
        return updateProfile;
    },

    async delete_post (req,res, decoded) {	

        const deletePost = await post.destroy({  
                where: {
                    post_id: req.body.post_id,
                    user_id: decoded.user_id
                },
        });

        return deletePost;
    },

    async delete_comment (req,res, decoded) {	

        const deleteComment = await comment.destroy({  
                where: {
                    comment_id: req.body.comment_id,
                    user_id: decoded.user_id
                },
        });

        return deleteComment;
    },

// lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll

    async post (req,res) {	

        const all_post = await post.findAll({
            raw: true,
            include: [
                {
                    model : user,
                    attributes : ['name', 'surname']
                }
            ],
        });

        return all_post;
    },

    async comment (req,res) {	

        const all_comment = await comment.findAll({
            raw: true,
            include: [
                {
                    model : user,
                    attributes : ['name', 'surname']
                }
            ],
        });

        return all_comment;
    },

    async like (req,res) {

        const all_like = await post.findAll({
            raw: true,

            include: [
                {
                    model : vote,
                    attributes : [[Sequelize.fn('COUNT', Sequelize.col('votes.post_id')), 'like']]
                },
        ],
            group: ['post.post_id'],

            order: [
                ['post_id', 'DESC'],
            ],
        });

        return all_like;
    },

    async count_post (req, res) {	

        const num_post = await post.count({  

                include: [
                    {
                        model : category,
                        attributes : ['category_name']
                    },
                ],

                group: ['post.category_id'],
        });

        return num_post;
    },

}

module.exports = model;