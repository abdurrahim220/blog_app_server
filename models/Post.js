const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            require:true,
            unique:true
        },
        desc:{
            type:String,
            require:true,
            unique:true
        },
        photo:{
            type:String,
            require:false,
        },
        username:{
            type:String,
            require:true,
        },
        userId:{
            type:String,
            require:true,
        },
        category:{
            type:Array,
        },
    },{timestamps:true}
)

module.exports = mongoose.model("Post",PostSchema)