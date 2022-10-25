import mongoose  from "mongoose";
const QuotesSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    
})

mongoose.model("Quotes",QuotesSchema)