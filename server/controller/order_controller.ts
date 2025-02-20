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


type CheckoutSessionRequest = {
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
        // console.log(order);
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

export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const checkoutSessionRequest: CheckoutSessionRequest = req.body;
        const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId).populate('menus');
        
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }

        // Calculate the total amount
        let totalAmount = 0;
        checkoutSessionRequest.cartItems.forEach((cartItem) => {
            const menuItem = restaurant.menus.find((item: any) => item._id.toString() === cartItem.menuId);
            if (menuItem) {
                totalAmount += cartItem.price * cartItem.quantity;  // Add the price * quantity for each item
            }
        });

        const order = new Order({
            restaurant: restaurant._id,
            user: req.id,
            deliveryDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest.cartItems,
            totalAmount: totalAmount,  // Save the totalAmount to the order
            status: "pending"
        });
// console.log(order);
        const menuItems = restaurant.menus;
        const lineItems = createLineItems(checkoutSessionRequest, menuItems);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['US', 'GB', 'CA']
            },
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/order/status`,
            cancel_url: `${process.env.FRONTEND_URL}/cart`,
            metadata: {
                orderId: order._id.toString(),
                images: JSON.stringify(menuItems.map((item: any) => item.image))
            }
        });

        if (!session.url) {
            return res.status(400).json({
                success: false,
                message: "Failed to create session"
            });
        }

        await order.save();  // Save the order with the totalAmount and other details

        return res.status(200).json({
            success: true,
            message: "Checkout session created",
            session
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


export const stripeWebhook = async (req: Request, res: Response) => {
    let event;

    try {
        const signature = req.headers["stripe-signature"];

        // Construct the payload string for verification
        const payloadString = JSON.stringify(req.body, null, 2);
        const secret = process.env.WEBHOOK_ENDPOINT_SECRET!;

        // Generate test header string for event construction
        const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret,
        });

        // Construct the event using the payload string and header
        event = stripe.webhooks.constructEvent(payloadString, header, secret);
    } catch (error: any) {
        console.error('Webhook error:', error.message);
        return res.status(400).send(`Webhook error: ${error.message}`);
    }

    // Handle the checkout session completed event
    if (event.type === "checkout.session.completed") {
        try {
            const session = event.data.object as Stripe.Checkout.Session;
            const order = await Order.findById(session.metadata?.orderId);

            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            // Update the order with the amount and status
            if (session.amount_total) {
                order.totalAmount = session.amount_total;
            }
            order.status = "confirmed";

            await order.save();
        } catch (error) {
            console.error('Error handling event:', error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    // Send a 200 response to acknowledge receipt of the event
    res.status(200).send();
};


export const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems: any) => {


   try{
     //1.create line itmes

     const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find((item:any) => item._id.toString() === cartItem.menuId);
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