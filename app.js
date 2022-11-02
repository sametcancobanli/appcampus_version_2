//////////// dependencies //////////////
var express     = require("express"),
    multer      = require("multer"),
    bodyParser  = require("body-parser"),
    app         = express();
    // path 		= require('path');
    // session     = require('express-session');
    expressGraphQL = require('express-graphql');
const url 		= require('url');    
const checkJwt = require('./auth');
////////////////////////////////////////

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";.....................

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCM6oA_67_dyX4sLlxpywo0Q_btGP4kV-U",
//   authDomain: "appcampus-f2c15.firebaseapp.com",
//   projectId: "appcampus-f2c15",
//   storageBucket: "appcampus-f2c15.appspot.com",
//   messagingSenderId: "543039832088",
//   appId: "1:543039832088:web:01831d8a4a1bde6a5fc36d",
//   measurementId: "G-4JKSBHD5MB"
// };

// Initialize Firebase
// const app_firebase = initializeApp(firebaseConfig);
// const auth = getAuth(app_firebase);

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

//   signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });

//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       const uid = user.uid;
//       // ...
//     } else {
//       // User is signed out
//       // ...
//     }
//   });

// const analytics = getAnalytics(app);......................

//////// dependencies attributes ///////
// app.use(session({
// 	secret: 'secret',
// 	resave: true,
// 	saveUninitialized: true
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
// app.use(express.static("public"));
// app.set("view engine", "ejs");
// app.set('views', path.join(__dirname, 'views'));
////////////////////////////////////////

////////////// routes //////////////////
const controller = require('./controller');
const webcontroller = require('./webcontroller');


///////////// restful start //////////////////
app.post("/webservice/register", webcontroller.registerService);
app.post("/webservice/login", webcontroller.loginService);
app.post("/webservice/forumpage", checkJwt, webcontroller.forumPage);
app.post("/webservice/forumcategory", checkJwt, webcontroller.forumCategory);
app.post("/webservice/forumsearch", checkJwt, webcontroller.forumSearch);

app.post("/webservice/categories", checkJwt, webcontroller.categories);
app.post("/webservice/likepost", checkJwt, webcontroller.likePost);
app.post("/webservice/newpost", checkJwt, webcontroller.newPost);

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