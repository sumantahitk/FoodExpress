import mongoose, { Document } from "mongoose";


type DeliveryDeatails={
    email:string,
    name:string,
    address:string,
    city:string
}
type CartItems={
    menuId:string,
    name:string,
    image:string,
    price:number,
    quantity:number
}
export interface Iorder extends Document{
    user:mongoose.Schema.Types.ObjectId,
    restaurant:mongoose.Schema.Types.ObjectId,
    deliveryDetails:DeliveryDeatails,
    cartItems:CartItems,
    totalAmount:number,
    status:"pending"| "confirmed" | "preparing" | "outForDelivery" | "delivered",
}
const orderSchema=new mongoose.Schema<Iorder>({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
        required:true
    },
    deliveryDetails:{
        email:{
            type:String,
            require:true
        },
        name:{
            type:String,
            require:true
        },
        address:{
            type:String,
            require:true
        },
        city:{
            type:String,
            require:true
        },
    },
    cartItems:[
        {
            menuId:{
                type:String,
                require:true
            },
            name:{
                type:String,
                require:true
            },
            image:{
                type:String,
                require:true
            },
            price:{
                type:Number,
                require:true
            },
            quantity:{
                type:Number,
                require:true
            },
        }
    ],
    totalAmount:{
        type:Number,
        require:true
    },
    status:{
        type:String,
        enum:["pending","confirmed" , "preparing" , "outForDelivery" ,"delivered","cancelled"],
        required:true
    },
},{timestamps:true});

export const Order =mongoose.model("Order",orderSchema);