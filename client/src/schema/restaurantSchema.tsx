import {z} from "Zod";

export const RestaurantFromSchema=z.object({
    restaurantName:z.string().nonempty({message:"Restaurant name is required  "}),
    city:z.string().nonempty({message:"City is required  "}),
    country:z.string().nonempty({message:"Country is required  "}),

    deliveryTime:z.number().min(0,{message:"Delivery time can not be negative"}),
    cuisines:z.array(z.string()),
    imageFile:z.instanceof(File).optional().refine((file)=>file?.size!==0,{message:"Image is required"})

});

export type RestaurantFromSchema=z.infer<typeof RestaurantFromSchema>;