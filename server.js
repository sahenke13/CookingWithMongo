
//require express, morgan and mongoose
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars")

//needed for scrapping
var axios = require("axios");
var cheerio = require("cheerio");

//bring in models
// var db = (require("./models"));

//set PORT To 3000
var PORT = 3000;

//initialize express
var app = express();
//use morgan for loggin request logging
app.use(logger("dev"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//connect to mongoose
mongoose.connect("mongodb://localhost/cookingArticlesdb",{ useNewUrlParser: true });

//routes
app.get("/", function(req,res){
    console.log("The / route is working")
    res.render("index");
})

app.get("/scrape", function(req, res){
    axios.get("https://www.foodnetwork.ca/all-articles/".then(function(i, element){

    var $ = cheerio.load(response.data)

    $("post-info").each(function(i,element){

        var result= {};

        result.title = $(this).children("a").text();
        result.href = $(this).children("a").attr(href);


    })



            
    })
    )
});


// Start the server
app.listen(PORT, function() {
    console.log("Cooking Scrapper App is running on port " + PORT + "!");
  });