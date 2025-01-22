import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import Stripe from "stripe";
import { Order } from "../models/order.model";



// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// console.log(`${process.env.SECRET_KEY}`);
;

const stripeSecretKey = `${process.env.STRIPE_SECRET_KEY}`;

if (!stripeSecretKey) {
    throw new Error("Stripe secret key is missing. Ensure it is set in the environment variables.");
}
const stripe = new Stripe(stripeSecretKey);


type checkoutSessionRequest = {
    cartItems: {
        menuId: string,
        name: string,
        price: number,
        quantity: number,
        image: string,
    }[],
    deliveryDetails: {
        name: string,
        email: string,
        address: string,
        city: string,
    },
    restaurantId: string

}
export const getOrders = async (req: Request, res: Response) => {
    try{
        const order = await Order.find({user:req.id}).populate("user").populate("restaurant");
        return res.status(200).json({
            success:true,
            order
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        })
    }
}
export const createCheckoutSeason = async (req: Request, res: Response) => {
    try {
        const checkoutSessionRequest: checkoutSessionRequest = req.body;
        const restaurant = await Restaurant.findById
            (checkoutSessionRequest.restaurantId).populate('menu');
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }

        const order = new Order({
            restaurant: restaurant._id,
            user: req.id,
            deliveryDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest.cartItems,
            status: "pending"

        })
        //line item

        const menuItems = restaurant.menus;
        const lineItems = createLineItems(checkoutSessionRequest, menuItems)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['US', 'GB', 'CA'],
            },
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/order/status`,
            cancel_url: `${process.env.FRONTEND_URL}`,
            metadata: {
                orderId: order._id.toString(),
                images: JSON.stringify(menuItems.map((item: any) => item.image))

            }
        });
        if(!session.url){
            return res.status(400).json({
                success: false,
                message: "Failed to create session"
                });
        }
        await order.save();
        return res.status(200).json({
            success: true,
            message: "Checkout session created",
            session
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const createLineItems = (checkoutSessionRequest: checkoutSessionRequest, menuItems: any) => {


   try{
     //1.create line itmes

     const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find((item:any) => item._id === cartItem.menuId);
        if (!menuItem) throw new Error("Menu item id not found");

        return {
            price_data: {
                currency: "inr",
                product_data: {
                    name: menuItem.name,
                    images: [menuItem.image],
                },
                unit_amount: menuItem.price * 100
            },
            quantity: cartItem.quantity,
        }
    })
    //2. return lineitems

    return lineItems
   }catch(error){
    console.log(error);

   }

}