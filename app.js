var express    = require("express"),
    app        = express(),
    mongoose   = require("mongoose"),
    bodyParser = require('body-parser');

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/sites",{useNewUrlParser: true});

const localhost = "127.0.0.1",port = 5000;

var dataSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Data = mongoose.model("Data",dataSchema);

// var data = [
//     {name:"Malshej Ghat", image:"https://static2.tripoto.com/media/filter/nl/img/484128/TripDocument/1567589736_fullsizerender.jpg"},
//     {name:"Amar Nath", image:"https://secureservercdn.net/198.71.233.227/xms.7ef.myftpupload.com/wp-content/uploads/2019/10/Amarnath-241762_10-1-1-990x490.jpg"},
//     {name:"Gir Gardan Ghat", image:"https://i.ytimg.com/vi/KVUBLLqhzjc/maxresdefault.jpg"}
    
// ];

app.get("/sites", function(req,res){
    Data.find({},function(err, campsite){
        if(err){
            console.log(err);
        }else{
            res.render("index",{data: campsite});
        }
    });
})

app.get("/sites/new", function(req,res){
    res.render("new");
})

app.get("/sites/:id",function(req,res){
    Data.findById(req.params.id,function(err, result){
        if(err){
            console.log(err);
        }else{
            res.render("show",{result: result});
        }
    });
    
})

app.post("/sites", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var site = {name: name, image: image, description: desc};
    Data.create(site,function(err, campsite){
        if(err){
            console.log(err);
        }else{
            console.log("NEW DATA INSERTED!!");
            res.redirect("/sites");
        }
    });
})

app.listen(port, localhost, function(){
    console.log("SERVER HAS STARTED!!");
})