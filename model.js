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


var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "penguen123",
  database: "uni_media"
});
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

const message = db.define('message', {
    message_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    sender_id: {
        type: Sequelize.INTEGER,
    },
    receiver_id: {
        type: Sequelize.INTEGER,
    },
    m_text: {
        type: Sequelize.TEXT,
    },
    creation_time: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
});
// message.sync().then(() => {
//     console.log('message table created');
// });

const notification = db.define('notification', {
    notification_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    sender_id: {
        type: Sequelize.INTEGER,
    },
    receiver_id: {
        type: Sequelize.INTEGER,
    },
    type: {
        type: Sequelize.STRING(20),
    },
    content_id: {
        type: Sequelize.INTEGER,
    },
    creation_time: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
});
// notification.sync().then(() => {
//     console.log('notification table created');
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

user.hasMany(message, {
    foreignKey: 'sender_id',
    onDelete: 'cascade',
    hooks:true })
user.hasMany(message, {
    foreignKey: 'receiver_id',
    onDelete: 'cascade',
    hooks:true })
message.belongsTo(user, {
    foreignKey: 'sender_id',
    onDelete: 'cascade',
    hooks:true })
message.belongsTo(user, {
    foreignKey: 'receiver_id',
    onDelete: 'cascade',
    hooks:true })

user.hasMany(notification, {
    foreignKey: 'sender_id',
    onDelete: 'cascade',
    hooks:true })
user.hasMany(notification, {
    foreignKey: 'receiver_id',
    onDelete: 'cascade',
    hooks:true })
notification.belongsTo(user, {
    foreignKey: 'sender_id',
    onDelete: 'cascade',
    hooks:true })
notification.belongsTo(user, {
    foreignKey: 'receiver_id',
    onDelete: 'cascade',
    hooks:true })


post.hasMany(notification, {
    foreignKey: 'content_id',
    onDelete: 'cascade',
    hooks:true })
notification.belongsTo(post, {
    foreignKey: 'content_id',
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
            "offset_info": off_set / 5,
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
            "offset_info": off_set / 5,
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
            "offset_info": off_set / 5,
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
            "offset_info": off_set / 5,
            "user_infos":profile,
            "user_posts":forumPage_profile
        }
                
        return returnVal;
    },

    async like_post (req,res, decoded) {

        const likePost = await vote.create({
            user_id: decoded.user_id,
            post_id: req.body.post_id,
        });   

        const newNotification = await notification.create({
            sender_id: decoded.user_id,
            receiver_id: req.body.user_id,
            type: 'like',
            content_id: req.body.post_id,
            raw: true,
        });

        var returnVal = {
            "newLike":likePost,
            "newNotification":newNotification
        }

        return returnVal;
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

        const newNotification = await notification.create({
            sender_id: decoded.user_id,
            receiver_id: req.body.user_id,
            type: 'comment',
            content_id: req.body.post_id,
            raw: true,
        });

        var returnVal = {
            "newCommment":newComment,
            "newNotification":newNotification
        }

        return returnVal;
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

    async message_page (req,res, decoded) {	

        const messagePage = await message.findAll({  
            where:{
                [Op.or]: [
                    { 
                        receiver_id : decoded.user_id, 
                    },
                    { 
                        sender_id : decoded.user_id, 
                    }
                ],
            },

            attributes:['sender_id', 'receiver_id'],
            include:[{
               
                model:user,
                attributes : [[Sequelize.fn("concat", Sequelize.col('user.name'), " ", Sequelize.col('user.surname')), 'fullname']],

            }],
            

            group: ['sender_id','receiver_id'],
            order: [['message_id', 'DESC']],
        });

        return messagePage;
        
    },

    async priv_message_page (req,res, decoded) {	

        var off_set = 0;
        if(req.body.offset){
            off_set = 10 * req.body.offset;
        }

        const privMessagePage = await message.findAll({  
            where:{
                [Op.or]: [
                    {   
                        sender_id : decoded.user_id,
                        receiver_id : req.body.receiver_id, 
                    },
                    { 
                        sender_id : req.body.receiver_id,
                        receiver_id : decoded.user_id, 
                    }
                  ]
            },

            group: ['message.message_id'],
            order: [['message_id', 'DESC']],
            offset: off_set, // set the offset according your use case
            limit: 10  // limit the output

        });

        return privMessagePage;
    },

    async new_message (req,res, decoded) {	

        const newMessage = await message.create({  
            sender_id : decoded.user_id,
            receiver_id : req.body.receiver_id,
            m_text : req.body.m_text,
            raw: true,

        });

        return newMessage;
    },

    async notification_page (req,res, decoded) {	

        const notificationPage = await notification.findAll({  
            where:{
                [Op.or]: [
                    { 
                        receiver_id : decoded.user_id, 
                    },
                ],
            },

            include: [
                {
                    model : user,
                    attributes : [[Sequelize.fn("concat", Sequelize.col('user.name'), " ", Sequelize.col('user.surname')), 'fullname']],

                },
                {
                    model : post,

                },
            ],

            order: [['notification_id', 'DESC']],

        });

        return notificationPage;
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