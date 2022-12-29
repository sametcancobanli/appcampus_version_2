const { response } = require('express');
const model = require('./model');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

var firebase = require("firebase/compat/app");
require("firebase/compat/auth");

///////////////////////////////////////////////////////////////////////  RESTFUL START  ////////////////////////////////////////////////////////////////////////////////////////

const webcontroller = {	

	stringMap : async function(req, res){
		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1]
        		var decoded = jwt_decode(token);
				var stringMap = await model.string_map(req, res, decoded);
				var returnValue = {'status': true, "values":stringMap};
				res.send(returnValue);			
			} else {
				console.log("User not loggedin.");
				throw 'User not loggedin.';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},	

	registerService : async function(req, res){
        try {
			await firebase.auth().createUserWithEmailAndPassword(req.body.mail, req.body.password)
					.catch((error) => {
						var errorCode = error.code;
						var errorMessage = error.message;
						// var returnValue = {'status': false, "error": error.message};
						// res.send(returnValue);
						throw error.message
					});
			await firebase.auth().currentUser.sendEmailVerification().catch((error) => {
						var errorCode = error.code;
						var errorMessage = error.message;
						// var returnValue = {'status': false, "error": error.message};
						// res.send(returnValue);
						throw error.message
				});;
			var new_register = await model.check_register(req, res);
			if (new_register.mail != " ") {
                var returnValue = {'status': true, "values":new_register};
				res.send(returnValue);
			} else {
				console.log("Record not inserted.");
				throw 'Record not inserted.';
			}
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
			
		}	
	},

	loginService : async function(req, res) {
		try{
			var new_login = await model.check_login(req, res);

			if (new_login[0].isConfirmed == 0) {
				await firebase.auth().signInWithEmailAndPassword(new_login[0].mail, new_login[0].password)
					.catch((error) => {
						var errorCode = error.code;
						var errorMessage = error.message;
						throw error.message
					});
					
				var user = firebase.auth().currentUser;
				var emailVerifyStatus = firebase.auth().currentUser.emailVerified;

				if(emailVerifyStatus){
					var confirm_register = await model.confirm_register(req, res);
					const token = jwt.sign({
						mail: new_login[0].mail,
						user_id : new_login[0].user_id,
					}, 'secretKey', {
						expiresIn: "3h",
					})
					
					var returnValue = {'status': true, "token":token, "user_id": new_login[0].user_id };

				} else {
					var returnValue = {'status': false, "error":'Please verify your email'};
				}

			} else if (new_login[0].isConfirmed == 1) {

				const token = jwt.sign({
					mail: new_login[0].mail,
					user_id : new_login[0].user_id,
				}, 'secretKey', {
					expiresIn: "3h",
				})
				
				var returnValue = {'status': true, "token":token,"user_id": new_login[0].user_id};

			} else {
				console.log("User not loggedin.");
				throw 'User not loggedin.';
			}

			res.send(returnValue);

		} catch(error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},

	refreshToken : async function(req, res){
		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1];
        		var decoded = jwt_decode(token);

				const refreshToken = jwt.sign({
					mail: decoded.mail,
					user_id : decoded.user_id,
				}, 'secretKey', {
					expiresIn: "3h",
				})


				var returnValue = {'status': true, "token":refreshToken};
				res.send(returnValue);		
			} else {
				console.log("Post are not loading..");
				throw 'Post are not loading..';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},

	forumPage : async function(req, res){
		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1];
        		var decoded = jwt_decode(token);
				var forumPage = await model.forum(req, res, decoded);

				if(forumPage.posts[0].dataValues.votes[0].dataValues.itsliked > 0 ){
					forumPage.posts[0].dataValues.votes[0].dataValues.itsliked = "yes";
				} 

				var returnValue = {'status': true, "values":forumPage};
				res.send(returnValue);		
			} else {
				console.log("Post are not loading..");
				throw 'Post are not loading..';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},

	forumCategory : async function(req, res){
		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1]
        		var decoded = jwt_decode(token);
				var forumPage_category = await model.forum_category(req, res, decoded);

				if(forumPage_category.posts[0].dataValues.votes[0].dataValues.itsliked > 0 ){
					forumPage_category.posts[0].dataValues.votes[0].dataValues.itsliked = "yes";
				} 

				var returnValue = {'status': true, "values":forumPage_category};
				res.send(returnValue);			
			} else {
				console.log("User not loggedin.");
				throw 'User not loggedin.';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},

	forumSearch : async function(req, res){
		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1]
        		var decoded = jwt_decode(token);
				var forumPage_search = await model.forum_search(req, res, decoded);

				if(forumPage_search.posts[0].dataValues.votes[0].dataValues.itsliked > 0 ){
					forumPage_search.posts[0].dataValues.votes[0].dataValues.itsliked = "yes";
				} 

				var returnValue = {'status': true, "values":forumPage_search};
				res.send(returnValue);			
			} else {
				console.log("User not loggedin.");
				throw 'User not loggedin.';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},

	likePost : async function(req, res){
		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1]
        		var decoded = jwt_decode(token);
				var likePost = await model.like_post(req, res, decoded);
				var returnValue = {'status': true, "values":likePost};
				res.send(returnValue);			
			} else {
				console.log("User not loggedin.");
				throw 'User not loggedin.';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},

	dislikePost : async function(req, res){

		
		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1]
        		var decoded = jwt_decode(token);
				var dislikePost = await model.dislike_post(req, res, decoded);
				var returnValue = {'status': true, "values":dislikePost};
				res.send(returnValue);			
			} else {
				console.log("User not loggedin.");
				throw 'User not loggedin.';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},

	newPost : async function(req, res){
		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1]
        		var decoded = jwt_decode(token);
				var newPost = await model.new_post(req, res, decoded);
				var returnValue = {'status': true, "values":newPost};
				res.send(returnValue);			
			} else {
				console.log("User not loggedin.");
				throw 'User not loggedin.';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},

	newComment : async function(req, res){
		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1]
        		var decoded = jwt_decode(token);
				var newComment = await model.new_comment(req, res, decoded);
				var returnValue = {'status': true, "values":newComment};
				res.send(returnValue);			
			} else {
				console.log("User not loggedin.");
				throw 'User not loggedin.';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},

	categories : async function(req, res){
		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1]
        		var decoded = jwt_decode(token);
				var categories = await model.categories(req, res, decoded);
				var returnValue = {'status': true, "values":categories};
				res.send(returnValue);			
			} else {
				console.log("User not loggedin.");
				throw 'User not loggedin.';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},

	profile : async function(req, res){

		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1]
        		var decoded = jwt_decode(token);
				// var profile = await model.profile(req, res, decoded);
				var forumPage_profile = await model.forum_profile(req, res, decoded);
				var returnValue = {'status': true, "values":forumPage_profile};
				res.send(returnValue);			
			} else {
				console.log("User not loggedin.");
				throw 'User not loggedin.';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},

	updateProfile : async function(req, res){

		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1]
        		var decoded = jwt_decode(token);
				var updateProfile = await model.update_profile(req, res, decoded);
				var returnValue = {'status': true, "values":updateProfile};
				res.send(returnValue);			
			} else {
				console.log("User not loggedin.");
				throw 'User not loggedin.';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},

	deletePost : async function(req, res){

		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1]
        		var decoded = jwt_decode(token);
				var deletePost = await model.delete_post(req, res, decoded);
				var returnValue = {'status': true, "values":deletePost};
				res.send(returnValue);			
			} else {
				console.log("User not loggedin.");
				throw 'User not loggedin.';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},

	deleteComment : async function(req, res){

		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1]
        		var decoded = jwt_decode(token);
				var deleteComment = await model.delete_comment(req, res, decoded);
				var returnValue = {'status': true, "values":deleteComment};
				res.send(returnValue);			
			} else {
				console.log("User not loggedin.");
				throw 'User not loggedin.';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},

	messagePage : async function(req, res){

		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1]
        		var decoded = jwt_decode(token);
				var messagePage = await model.message_page(req, res, decoded);
				var returnValue = {'status': true, "values":messagePage};
				res.send(returnValue);		
			} else {
				console.log("User not loggedin.");
				throw 'User not loggedin.';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},

	privMessagePage : async function(req, res){

		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1]
        		var decoded = jwt_decode(token);
				var privMessagePage = await model.priv_message_page(req, res, decoded);
				var returnValue = {'status': true, "values":privMessagePage};
				res.send(returnValue);			
			} else {
				console.log("User not loggedin.");
				throw 'User not loggedin.';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},
	
	newMessage : async function(req, res){

		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1]
        		var decoded = jwt_decode(token);
				var newMessage = await model.new_message(req, res, decoded);
				var returnValue = {'status': true, "values":newMessage};
				res.send(returnValue);			
			} else {
				console.log("User not loggedin.");
				throw 'User not loggedin.';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},

	notificationPage : async function(req, res){

		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1]
        		var decoded = jwt_decode(token);
				var notificationPage = await model.notification_page(req, res, decoded);
				var returnValue = {'status': true, "values":notificationPage};
				res.send(returnValue);			
			} else {
				console.log("User not loggedin.");
				throw 'User not loggedin.';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},

	//////////////////////////////////////////

	allPost : async function(req, res){
		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1]
        		var decoded = jwt_decode(token);
				var all_post = await model.post(req, res, decoded);
				  
				all_post.forEach(element => {
					element.user.dataValues.name = element.user.dataValues.name + ' ' + element.user.dataValues.surname;
					delete element['user.name'];
					delete element['user.surname'];
					
					
				});

				var returnValue = {'status': true, "values":all_post};
				res.send(returnValue);			
			} else {
				console.log("Post are not loading..");
				throw 'Post are not loading..';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},

	allComment : async function(req, res){
		try {
			if (true) {
				var all_comment = await model.comment(req, res);
				var returnValue = {'status': true, "values":all_comment};
				res.send(returnValue);			
			} else {
				console.log("User not loggedin.");
				throw 'User not loggedin.';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},

	allLike : async function(req, res){
		try {
			if (true) {
				var all_like = await model.like(req, res);
				var returnValue = {'status': true, "values":all_like};
				res.send(returnValue);			
			} else {
				console.log("User not loggedin.");
				throw 'User not loggedin.';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},

	countCategory : async function(req, res){
		try {
			if (true) {
				var category_1 = await model.count_post(req, res);
				var returnValue = {'status': true, "category":category_1};
				res.send(returnValue);			
			} else {
				console.log("User not loggedin.");
				throw 'User not loggedin.';
			}	
		} catch (error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},
}

module.exports = webcontroller;