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
const { QueryTypes } = require('sequelize');


// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "penguen123",
//   database: "uni_media"
// });
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
const string_map = db.define('string_map', {
    language_text: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    key_text: {
        type: Sequelize.STRING(50),
    },
    text: {
        type: Sequelize.STRING(50)
    }
});
// category.sync().then(() => {
//     console.log('string_map table created');
// });

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
    photo: {
        type: Sequelize.TEXT
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
        autoIncrement: true,
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
        references: {
            model: 'user',
            key: 'user_id',
            as: 'sender_id',
        }
    },
    receiver_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'user',
            key: 'user_id',
            as: 'receiverId',
        }
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
    receiver_id: {
        type: Sequelize.INTEGER,
    },
    sender_id: {
        type: Sequelize.INTEGER,
    },
    type: {
        type: Sequelize.STRING(20),
    },
    post_id: {
        type: Sequelize.INTEGER,
    },
    react_id: {
        type: Sequelize.INTEGER
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
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks:true })
notification.belongsTo(post, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks:true })


const model = {

    async string_map(req,res) {

        const string_map_values = await string_map.findAll({
            raw: true,
            where: {
                language_text: req.body.language_text
            },
        });

        return string_map_values;
    },

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
                    attributes : ['photo', [Sequelize.fn("concat", Sequelize.col('user.name'), " ", Sequelize.col('user.surname')), 'fullname']],

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
                    attributes : ['photo',[Sequelize.fn("concat", Sequelize.col('user.name'), " ", Sequelize.col('user.surname')), 'fullname']],

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
                    attributes : ['photo',[Sequelize.fn("concat", Sequelize.col('user.name'), " ", Sequelize.col('user.surname')), 'fullname']],

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
                user_id : req.body.user_id

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
            post_id: req.body.post_id,
            react_id : likePost.dataValues.vote_id,
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
            photo : req.body.photo,
            p_vote: 0,
            raw: true,
        });

        return newPost;
    },

    async new_comment (req,res, decoded) {	

        const newComment = await comment.create({
            user_id: decoded.user_id,
            c_text: req.body.c_text,
            post_id: req.body.post_id
        });

        const newNotification = await notification.create({
            sender_id: decoded.user_id,
            receiver_id: req.body.user_id,
            type: 'comment',
            post_id: req.body.post_id,
            react_id : newComment.null,
        });

        var returnVal = {
            "newCommment":newComment,
            "newNotification":newNotification
        }

        return returnVal;
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
                photo: req.body.photo,
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
    // const messagePage = await db.query("SELECT UM.message_id, UM.sender_id , UM.receiver_id, UM.m_text, UM.creation_time, user_1.name as sender_name, user_1.surname as sender_surname, user_1.photo as sender_photo, user_2.name as receiver_name, user_2.surname as receiver_surname, user_2.photo as receiver_photo FROM message AS UM INNER JOIN( SELECT MAX(message_id) AS maxMessageID FROM message GROUP BY IF(sender_id > receiver_id, sender_id, receiver_id), IF(receiver_id > sender_id, receiver_id,sender_id) ) IUM ON UM.message_id = IUM.maxMessageID INNER JOIN  ( SELECT  user_id, name, surname,photo FROM user ) user_1 ON UM.sender_id = user_1.user_id  INNER JOIN ( SELECT  user_id, name, surname,photo FROM user ) user_2 ON UM.receiver_id = user_2.user_id WHERE UM.sender_id = '" + decoded.user_id + "' OR UM.receiver_id = '" + decoded.user_id + "' ORDER BY UM.creation_time DESC", { type: QueryTypes.SELECT });
    const messagePage = await db.query("SELECT UM.message_id, UM.sender_id , UM.receiver_id, UM.m_text, UM.creation_time, CASE WHEN UM.sender_id != '" + decoded.user_id + "' THEN CONCAT(user_1.name , ' ' , user_1.surname) WHEN UM.receiver_id != '" + decoded.user_id + "' THEN CONCAT(user_2.name ,' ', user_2.surname) ELSE NULL END as sender_username 	CASE WHEN UM.sender_id != '" + decoded.user_id + "' THEN user_1.photo WHEN UM.receiver_id != '" + decoded.user_id + "' THEN user_2.photo ELSE NULL END as sender_photo FROM message AS UM INNER JOIN( SELECT MAX(message_id) AS maxMessageID FROM message GROUP BY IF(sender_id > receiver_id, sender_id, receiver_id), IF(receiver_id > sender_id, receiver_id, sender_id) ) IUM ON UM.message_id = IUM.maxMessageID INNER JOIN ( SELECT user_id, name, surname, photo FROM user ) user_1 ON UM.sender_id = user_1.user_id INNER JOIN  ( SELECT  user_id, name, surname, photo FROM user ) user_2 ON UM.receiver_id = user_2.user_id WHERE UM.sender_id = '" + decoded.user_id + "' OR UM.receiver_id = '" + decoded.user_id + "' ORDER BY UM.creation_time DESC;", { type: QueryTypes.SELECT });
        return messagePage;
    },

    async priv_message_page (req,res, decoded) {	

        var off_set = 0;
        if(req.body.offset){
            off_set = 15 * req.body.offset;
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

            include: [
                {
                    model : user,
                    attributes : [[Sequelize.fn("concat", Sequelize.col('user.name'), " ", Sequelize.col('user.surname')), 'fullname']],

                },
            ],

            group: ['message.message_id'],
            order: [['message_id', 'DESC']],
            offset: off_set, // set the offset according your use case
            limit: 15  // limit the output

        });

        var returnVal = {
            "offset_info": off_set / 15,
            "messages":privMessagePage
        }

        return returnVal;
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

        const notificationPage = await db.query("SELECT UX.notification_id, UX.sender_id , UX.receiver_id, UX.type, UX.post_id, UX.creation_time, posts.p_text as text, user_1.name as sender_name, user_1.surname as sender_surname, RX.total_reaction as total_reaction FROM notification AS UX INNER JOIN (SELECT MAX(notification_id) AS maxNotificationID FROM notification GROUP BY post_id, type ) IUX ON UX.notification_id = IUX.maxNotificationID INNER JOIN (SELECT COUNT(post_id) AS total_reaction, post_id, type FROM notification GROUP BY post_id, type ) RX ON UX.post_id = RX.post_id INNER JOIN (SELECT user_id, name, surname FROM user) user_1 ON UX.sender_id = user_1.user_id  INNER JOIN  ( SELECT  p_text FROM post ) posts WHERE UX.receiver_id = '" + decoded.user_id + "' GROUP BY notification_id ORDER BY UX.creation_time DESC", { type: QueryTypes.SELECT });
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