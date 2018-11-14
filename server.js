
//require express, morgan and mongoose
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

//needed for scrapping
var axios = require("axios");
var cheerio = require("cheerio");

//bring in models
var db = (require("./models"));

//set PORT To 3000
var PORT = process.env.PORT || 3000;

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
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/cookArticlesdb";

mongoose.connect(MONGODB_URI);

//routes
app.get("/", function(req, res){
    db.Article.find({saved:false}).then(function(data){
        var articleObject = {
            cookArticle: data
        }
        res.render("index",articleObject);
    }).catch(function(err){
        res.json(err);
    });
});

app.get("/scrape", function(req, res){

    axios.get("https://www.foodnetwork.ca/all-articles/").then(function(response){
    var $ = cheerio.load(response.data)
    $("li h3").each(function(i,element){
        var result= {};

        result.title = $(this).children("a").text().trim();
        result.link = "https://www.foodnetwork.ca" + $(this).children("a").attr("href");
        result.summary = $(this).siblings("p").text().trim();

        console.log("result is: " + result)

        db.Article.create(result).then(function(cookArticle){
            console.log(cookArticle);
        }).catch(function(err){
                console.log(err);
        });
    });
    res.redirect("/"); 
    });
    
});

//route to view saved Articles
app.get("/savedArticles", function(req,res){
    db.Article.find({saved:true}).populate("comment").then(function(data){
        var savedObject = {
            savedObject: data
        }
        console.log(savedObject);
        res.render("saved",savedObject);
    }).catch(function(err){
        res.json(err);
    });
    });

//route to update whether an article is saved or not

app.post("/cookingArticles/saved/:id", function(req,res){
    db.Article.findOneAndUpdate({"_id": req.params.id},{$set:{saved:true}})
        .then(function(){
            res.redirect("/");
        }).catch(function(err){
            res.json(err);
        });
});

app.get("/clear", function(req,res){
    db.Article.remove({saved:false}).then(function(){
        res.redirect("/");
    }).catch(function(err){
        res.json(err);
    });
    res.redirect("/");
});

app.post("/savedArticles/delete/:id", function(req,res){
    db.Article.findByIdAndRemove({"_id":req.params.id}).then(function(req,res){
        res.redirect("/savedArticles")
    }).catch(function(err){
        res.json(err);
    });
    });

app.post("/savedArticles/:id",function(req,res){
    
    db.Comment.create(req.body)
        .then(function(result){
            db.Article.findOneAndUpdate({"_id":req.params.id},{$push:{comment:result._id}},{new:true})
                .populate("comment")
                    .then(result=>res.json(result))
         });
        res.redirect("/savedArticles")
});



app.get("/notes", function(req, res){
    db.Comment.find({}).populate("articleId")
        .then(function(result){
        res.json(result)
        })
})

app.post("/notes/delete/:id",function(req,res){
    
   
  

    db.Comment.findByIdAndRemove({_id: req.params.id}).then(function(result){
        
            console.log(result)
            res.json(result);

    }).catch(function(err){
        res.json(err);
    });
    });
    

// Start the server
app.listen(PORT, function() {
    console.log("Cooking Scrapper App is running on port " + PORT + "!");
  });