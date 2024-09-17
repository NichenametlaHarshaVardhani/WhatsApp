const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path= require("path");
const Chat= require("./models/chat.js");
const methodOverride = require("method-override");




app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));





main()
.then(()=> console.log("connection successful"))
.catch(err => console.log(err));




async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

 

// let chat1= new Chat({
//     from :"harsha",
//     to : "sunny",
//     msg:"what's today plan",
//     created_at: new Date()
// });

// chat1.save().then((res)=> console.log(res));



// show all chats
app.get("/chats",async (req,res)=>{
      let chats=  await Chat.find();
        // console.log(chats);
    res.render("index.ejs",{chats});

});


//new chat
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});



//insert new chat
app.post("/newchats",(req,res)=>{
        let { from, to, msg}= req.body;
        let newChat= new Chat ({
            from: from,
            to : to,
            msg:msg,
            created_at : new Date(),
        });
        newChat.save().then((res)=> console.log(res));
        res.redirect("/chats");
});

// edit the msg

app.get("/chats/:id/edit",async (req,res)=>{
    let {id}= req.params;
   let chat= await Chat.findById(id);
   console.log(chat);
    res.render("edit.ejs",{chat});
});

//update the edited msg

app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let newMsg = req.body.msg;
    console.log(req.body);
    let updatedChat = await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new :true});
    console.log(updatedChat);
    res.redirect("/chats");
});


//deleted chats

app.delete("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let chatdelete= await Chat.findByIdAndDelete(id);
    console.log(chatdelete);
    res.redirect("/chats");
});

//serach
app.get("/chats/search",(req,res)=>{
    res.render("search.ejs");
})


//

app.post("/chats/searchChats",async (req,res)=>{

    console.log(req.body);
    let {from:newfrom,to:newto}= req.body;
    newfrom = newfrom.trim();
    newto = newto.trim();
    let currentUser = newfrom;
    console.log(newfrom);
    console.log(newto);
    const query = { $or: [{ from: newfrom, to: newto }, { from: newto, to: newfrom }] };
    console.log("Query:", query);

    try {
        const searchChat = await Chat.find(query).exec();
        console.log("Search result:", searchChat);

        if (!searchChat.length) {
            console.log("No chats found for the given criteria.");
        }
        
        res.render("searchedChats.ejs", { searchChat,currentUser});
    } catch (err) {
        console.error("Error during chat search:", err);
        res.status(500).send("An error occurred while searching for chats.");
    }

});

app.listen(8080,()=>{
    console.log("listening");

});
