var express=require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var app=express();

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true,useUnifiedTopology:true});
const itemSchema={
    name:String
}
const Item=mongoose.model("Item",itemSchema);

const item1=new Item({
    name:"TASKS",
});

/*
const item2=new Item({
    name:"like",
});
const item3=new Item({
    name:"bye",
});
*/
const d=[item1];
/*
Item.insertMany(d, function(err)
{
    if(err){
        console.log(err);
    }
    else{
        console.log("successfully saved items to DB");
    }
});
*/
app.get("/",function(req,res)
{
    //res.send("Hey guys");
    Item.find({ }, function(err,f)
    {
       // console.log(f);
       if(f.length===0)
       {
        Item.insertMany(d,function(err)
        {
            if(err){
                console.log(err);
            }
            else{
                console.log("successfully saved items to DB");
            }
        });
        res.redirect("/");
       }
       else{
        res.render("list",{newListItems:f});   
       }
      // res.render("list",{newListItems:f});
    });
    
})

app.post("/",function(req,res)
{
     const itemName=req.body.n;
   // console.log(i);
   //res.render("list",{newListItem:i});
  // i1.push(i);
   //res.redirect("/");
   const item=new Item({
       name:itemName
   })
   item.save();
})
app.post("/delete",function(req,res)
{
    const check=req.body.checkbox;
    Item.findByIdAndRemove(check,function(err)
    {
        if(!err)
        {
            console.log("successfully deleted");
            res.redirect("/");
        }
    })
});

app.listen(3000,function()
{
    console.log("Listening to port 3000");
})