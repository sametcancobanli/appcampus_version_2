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
				createUserWithEmailAndPassword(auth, new_register.mail, new_register.password)
					.then((userCredential) => {
						// Signed in 
						const user = userCredential.user;
						// ...
					})
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;
						// ..
					});
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

				signInWithEmailAndPassword(auth, new_login[0].mail, new_login[0].password)
					.then((userCredential) => {
					// Signed in 
					const user = userCredential.user;
					})
					.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					});

				var confirm_register = await model.confirm_register(req, res);

				const token = jwt.sign({
					mail: new_login[0].mail,
					user_id : new_login[0].user_id,
				}, 'secretKey', {
					expiresIn: "3h",
				})
				var returnValue = {'status': true, "token":token};
				res.send(returnValue);

			} else if (new_login[0].isConfirmed == 1) {
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
				const token = req.headers.authorization.split(" ")[1];
        		var decoded = jwt_decode(token);
				var forumPage = await model.forum(req, res, decoded);
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

	forumSearch : async function(req, res){
		try {
			if (true) {
				const token = req.headers.authorization.split(" ")[1]
        		var decoded = jwt_decode(token);
				var forumPage_search = await model.forum_search(req, res, decoded);
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