import mongoose, { mongo } from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        require: true
    },

     email:{
        type:String,
        require: true,
        unique:true,
    },
     password:{
        type:String,
        require: true
    },
    role:{
        type:String,
        require:"user"
    },
    subscription:[
        {
            type: mongoose.Schema.Types.ObjectId,
        }
    ]
},
{
    timestamps:true,
}
)

export const User = mongoose.model("User",schema)