
import mongoose, { Document } from "mongoose";


export interface Imenu{
    // _id:mongoose.Schema.Types.ObjectId,
    name:string,
    description:string,
    price:number,
    image:string
}


export interface ImenuDocument extends Imenu,Document{
    createdAt:Date,
    updateAt:Date
}
const menuSchema=new mongoose.Schema<ImenuDocument>({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
},{timestamps:true});

export const Menu=mongoose.model("Menu",menuSchema);