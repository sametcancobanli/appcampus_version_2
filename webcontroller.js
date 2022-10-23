const { response } = require('express');
const model = require('./model');
const jwt = require('jsonwebtoken');

///////////////////////////////////////////////////////////////////////  RESTFUL START  ////////////////////////////////////////////////////////////////////////////////////////

const webcontroller = {	

	check_registerService : async function(req, res){
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

	check_loginService : async function(req, res, next) {
		try{
			var new_login = await model.check_login(req, res);
			if (new_login.length > 0) {
				const { mail } = req.body.mail
				const { password } = req.body.password
				const token = jwt.sign({
					mail: mail,
					password: password,
				}, 'secretKey', {
					expiresIn: "1h",
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

	check_allPost : async function(req, res){
		try {
			if (true) {
				var all_post = await model.post(req, res);
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

	// complete until here

	check_allComment : async function(req, res){
		try {
			var new_login = await model.check_login(req, res);
			if (new_login.length > 0) {
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

	check_allLike : async function(req, res){
		try {
			var new_login = await model.check_login(req, res);
			if (new_login.length > 0) {
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

	check_countCategory : async function(req, res){
		try {
			var new_login = await model.check_login(req, res);
			if (new_login.length > 0) {
				var category_1 = await model.count_post(req, res, "Yurtlar");
				var category_2 = await model.count_post(req, res, "Ders Notları");
				var category_3 = await model.count_post(req, res, "Genel");
				var returnValue = {'status': true, 
							"value_1":{"Yurtlar":category_1},
							"value_2":{"Ders Notları":category_2},
							"value_3":{"Genel":category_3}};
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

	check_postCategory : async function(req, res){
		try {
			var new_login = await model.check_login(req, res);
			if (new_login.length > 0) {
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
			var new_login = await model.check_login(req, res);
			if (new_login.length > 0) {
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
			var new_login = await model.check_login(req, res);
			if (new_login.length > 0) {
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
			var new_login = await model.check_login(req, res);
			if (new_login.length > 0) {
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