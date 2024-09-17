const mongoose = require("mongoose");
const Chat = require("./models/chat");






main()
.then(()=> console.log("connection successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}




let allChats= [
    { 
        from :"amma",
        to : "sunny",
        msg:"what's night plan",
        created_at: new Date()

    },
    { 
        from :"sunny",
        to : "amma",
        msg:"harsha is asking same thing",
        created_at: new Date()

    },
    { 
        from :"harsha",
        to :"dad",
        msg:"lets watch a movie",
        created_at: new Date()

    },
    { 
        from :"nanamma",
        to : "babai",
        msg:"Movie plan",
        created_at: new Date()

    },
    { 
        from :"babai",
        to : "pinni",
        msg:"Come on get ready, we are gng 2 watch movie",
        created_at: new Date()

    },

];

Chat.insertMany(allChats);


