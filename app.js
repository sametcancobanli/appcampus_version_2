//////////// dependencies //////////////
var express     = require("express"),
    multer      = require("multer"),
    bodyParser  = require("body-parser"),
    app         = express();
    path 		= require('path');
    session     = require('express-session');
    expressGraphQL = require('express-graphql');
const url 		= require('url');    
const checkJwt = require('./auth');
////////////////////////////////////////

//////// dependencies attributes ///////
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
////////////////////////////////////////

////////////// routes //////////////////
const controller = require('./controller');
const webcontroller = require('./webcontroller');


///////////// restful start //////////////////
app.post("/webservice/register", webcontroller.check_registerService);
app.post("/webservice/login", webcontroller.check_loginService);
app.post("/webservice/allpost", checkJwt, webcontroller.check_allPost);

// complete until here

app.post("/webservice/allcomment", webcontroller.check_allComment);
app.post("/webservice/alllike", webcontroller.check_allLike);
app.post("/webservice/countcategory", webcontroller.check_countCategory);

app.post("/webservice/postcategory", webcontroller.check_postCategory);
app.post("/webservice/likecategory", webcontroller.check_likeCategory);

app.post("/webservice/searchpost", webcontroller.check_searchPost);
app.post("/webservice/searchlike", webcontroller.check_searchLike);
/////////////////////////////////////////////

///////////// setting port /////////////
app.listen(3000, function(){
    console.log("Listening port number : 3000")
});
////////////////////////////////////////

module.exports = app;