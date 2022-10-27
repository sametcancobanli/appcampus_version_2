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
app.post("/webservice/allpost", checkJwt, webcontroller.allPost);
app.post("/webservice/allcomment", checkJwt, webcontroller.allComment);
app.post("/webservice/alllike", checkJwt, webcontroller.allLike);
app.post("/webservice/countcategory", checkJwt , webcontroller.countCategory);

app.post("/webservice/postcategory", webcontroller.postCategory);
app.post("/webservice/likecategory", webcontroller.check_likeCategory);

app.post("/webservice/searchpost", webcontroller.check_searchPost);
app.post("/webservice/searchlike", webcontroller.check_searchLike);
app.post("/webservice/sa", controller.forum);
/////////////////////////////////////////////

///////////// setting port /////////////
app.listen(3000, function(){
    console.log("Listening port number : 3000")
});
////////////////////////////////////////

module.exports = app;