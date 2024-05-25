const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose")

const pattern=/^[a-zA-Z\s]+$/;
const pattern2 = /^[0-9\s-]+$/;
const attschema=new mongoose.Schema({
    name:{
        type:String,
        match:pattern,
        required:true
    },
    rollno:{
        type:Number,
        max:999999999999,
        min:1,
        required:true,
        unique:true
    },
    course:{
        type:String,
        match:pattern,
        required:true
    },
    section:{
        type:String,
        match:pattern,
        minlength: 1, 
        maxlength: 1,
        required:true
    },
    year:{
        type:String,
        match:pattern2,
        required:true
    },
    phone: {
        type: Number,
        max: 9999999999, 
        min: 1000000000,
        required: true
    },
    atttaken:{
        type:Number,
        required:true
    },
    totalclass:{
        type:Number,
        required:true
    },
    attandencepercentage:{
        type:Number,
        required:true
    }

})
const detail1=mongoose.model("detail1",attschema);

const chat=new mongoose.Schema({
    author:{
        type:String,
        required:true
    },
    chat:{
        type:String,
        required:true
    },
    createdat:{
        type:String,
        required:true
    },
    createtime:{
        type:String,
        required:true
    }
})
const chats=mongoose.model("chats",chat);

const dates=mongoose.Schema({
    arrayOfDates:{
        type:String,
    }
})
const alldates=mongoose.model("alldates",dates);

const record=new mongoose.Schema({
    name:{
        type:String
        // required:true
    },
    course:{
        type:String
        // required:true
    },
    date:{
        type:Schema.Types.ObjectId,
        ref:alldates
    },
    dur:{
        type:Number
    },
    p_or_t:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    attandencepercentage:{
        type:Schema.Types.ObjectId,
        ref:detail1
    }
})
const datewise=mongoose.model("datewise",record);
// --------in case to add news input ----------------
// const alerts=mongoose.Schema({
//     news:{
//         type:String,
//         required:true
//     }
// })
// const addnews=mongoose.model("addnews",alerts);
// ---------------------------------------------------
const signupSchema=new mongoose.Schema({
    username: { type: String, required: true },
    course: { type: String, required: true },
    email: { type: String, required: true ,unique:true },
    identity: { type: String, required: true },
    password:{type:String,required:true}
})
signupSchema.plugin(passportLocalMongoose);
const signupinfo=mongoose.model("signupinfo",signupSchema);
module.exports={detail1,chats,datewise, alldates,signupinfo};
