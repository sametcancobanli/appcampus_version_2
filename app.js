//////////// dependencies //////////////
var express     = require("express"),
    multer      = require("multer"),
    bodyParser  = require("body-parser"),
    app         = express();
    expressGraphQL = require('express-graphql');
const url 		= require('url');    
const checkJwt = require('./auth');
var firebase = require("firebase/compat/app");
require("firebase/compat/auth");
////////////////////////////////////////

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM6oA_67_dyX4sLlxpywo0Q_btGP4kV-U",
  authDomain: "appcampus-f2c15.firebaseapp.com",
  projectId: "appcampus-f2c15",
  storageBucket: "appcampus-f2c15.appspot.com",
  messagingSenderId: "543039832088",
  appId: "1:543039832088:web:01831d8a4a1bde6a5fc36d",
  measurementId: "G-4JKSBHD5MB"
};

// Initialize Firebase
const app_firebase = firebase.initializeApp(firebaseConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

////////////// routes //////////////////
const webcontroller = require('./webcontroller');


///////////// restful start //////////////////
app.post("/webservice/register", webcontroller.registerService);
app.post("/webservice/login", webcontroller.loginService);
app.post("/webservice/forumpage", checkJwt, webcontroller.forumPage);
app.post("/webservice/forumcategory", checkJwt, webcontroller.forumCategory);
app.post("/webservice/forumsearch", checkJwt, webcontroller.forumSearch);

app.post("/webservice/categories", checkJwt, webcontroller.categories);
app.post("/webservice/likepost", checkJwt, webcontroller.likePost);
app.post("/webservice/dislikepost", checkJwt, webcontroller.dislikePost);
app.post("/webservice/newpost", checkJwt, webcontroller.newPost);
app.post("/webservice/newcomment", checkJwt, webcontroller.newComment);
app.post("/webservice/addphoto", checkJwt, webcontroller.addPhoto);

app.post("/webservice/profile", checkJwt, webcontroller.profile);
app.post("/webservice/updateprofile", checkJwt, webcontroller.updateProfile);

app.post("/webservice/deletepost", checkJwt, webcontroller.deletePost);
app.post("/webservice/deletecomment", checkJwt, webcontroller.deleteComment);

/////////////////////////////////////////////

app.post("/webservice/allpost", checkJwt, webcontroller.allPost);
app.post("/webservice/allcomment", checkJwt, webcontroller.allComment);
app.post("/webservice/alllike", checkJwt, webcontroller.allLike);
app.post("/webservice/countcategory", checkJwt , webcontroller.countCategory);

///////////// setting port /////////////
app.listen(3000, function(){
    console.log("Listening port number : 3000")
});
////////////////////////////////////////

module.exports = app;