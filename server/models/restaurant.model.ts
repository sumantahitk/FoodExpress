import mongoose, { Document } from "mongoose";

export interface Irestaurant{
    user:mongoose.Schema.Types.ObjectId,
    restaurantName:string,
    city:string,
    country:string,
    deliveryTime:number,
    cuisines:string[];
    imageUrl:string;
    menus:mongoose.Schema.Types.ObjectId[]
}

export interface IuserDocument extends Irestaurant,Document{
    createdAt:Date,
    updateAt:Date
}
const restaurantSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true,
    },
    restaurantName:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    },
    deliveryTime:{
        type:Number,
        require:true
    },
    cuisines:[{
        type:String,
        require:true
    }],
    menus:[{type:mongoose.Schema.Types.ObjectId,ref:'Menu'}],
    imageUrl:{
        type:String,
        require:true
    }
},{timestamps:true});

export const Restaurant=mongoose.model<IuserDocument>('Restaurant',restaurantSchema);