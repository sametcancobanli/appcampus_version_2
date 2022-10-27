const { response } = require('express');
const model = require('./model');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

///////////////////////////////////////////////////////////////////////  RESTFUL START  ////////////////////////////////////////////////////////////////////////////////////////

const webcontroller = {	

	registerService : async function(req, res){
        try {
			var new_register = await model.check_register(req, res);
			if (new_register.user_id > 0) {
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
			if (new_login.length > 0) {
				const token = jwt.sign({
					mail: new_login[0].mail,
					user_id : new_login[0].user_id,
				}, 'secretKey', {
					expiresIn: "3h",
				})
				var returnValue = {'status': true, "token":token};
				res.send(returnValue);
			} else {
				console.log("User not loggedin.");
				throw 'User not loggedin.';
			}
		} catch(error) {
			console.log(error);
			var returnValue = {'status': false, "error": error};
			res.send(returnValue);
		}
	},

	forumPage : async function(req, res){
		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1]
        		var decoded = jwt_decode(token);
				var forumPage = await model.forum(req, res, decoded);
				all_post.forEach(element => {
					element['fullName'] = element['user.name'] + ' ' + element['user.surname'];
					delete element['user.name'];
					delete element['user.surname'];
					
					
				});
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

	allPost : async function(req, res){
		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1]
        		var decoded = jwt_decode(token);
				var all_post = await model.post(req, res, decoded);
				  
				all_post.forEach(element => {
					element['fullName'] = element['user.name'] + ' ' + element['user.surname'];
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
				var category_1 = await model.count_post(req, res, "Yurtlar");
				var category_2 = await model.count_post(req, res, "Ders Notları");
				var category_3 = await model.count_post(req, res, "Genel");
				var returnValue = {'status': true, "category":{"Yurtlar":category_1,"Ders Notları":category_2,"Genel":category_3}};
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

	postCategory : async function(req, res){
		try {
			if (true) {
				var postcategory = await model.post_category(req, res, req.body.query);
				var returnValue = {'status': true, "values":postcategory};
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

	check_likeCategory : async function(req, res){
		try {
			if (true) {
				var likecategory = await model.like_category(req, res, req.body.query);
				var returnValue = {'status': true, "values":likecategory};
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

	check_searchPost : async function(req, res){
		try {
			if (true) {
				var searchpost = await model.post_search(req, res, req.body.query);
				var returnValue = {'status': true, "values":searchpost};
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

	check_searchLike : async function(req, res){
		try {
			if (true) {
				var searchlike = await model.like_search(req, res, req.body.query);
				var returnValue = {'status': true, "values":searchlike};
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