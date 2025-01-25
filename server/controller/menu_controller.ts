import { Request, Response } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";
import mongoose from "mongoose";

export const addMenu = async (req: Request, res: Response) => {
    try {
        const { name, description, price } = req.body;
        const file = req.file;
        console.log(name, description, price,file)

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            })
        };

        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
        const menu:any = await Menu.create({
            name,
            description,
            price,
            image: imageUrl
        });
        const restaurant = await Restaurant.findOne({ user: req.id });
        if (restaurant) {
            (restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id as any);
            // await restaurant.save();
 const updatedRestaurant = await restaurant.populate({
    path: 'menus',
    options: {sort:{ createdAt: -1 }}
});

        await updatedRestaurant.save();
            console.log("Updated restaurant with populated menus:", updatedRestaurant);
        }
       ;
        return res.status(201).json({
            success: true,
            message: "Menu added successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}


export const editMenu = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const file = req.file;
        const menu = await Menu.findById(id);
        if (!menu) {
            return res.status(404).json({
                success: false,
                message: "Menu not found"
            })
        }
        if(name) menu.name = name;
        if(description) menu.description = description;
        if(price) menu.price = price;

        if(file){
            const imageUrl= await uploadImageOnCloudinary(file as Express.Multer.File);
            menu.image = imageUrl;
        }
        await menu.save();
        return res.status(200).json({
            success: true,
            message: "Menu updated successfully",
            menu,
            });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}


export const getMenu = async (req: Request, res: Response) => {
    try {
        // Fetch the restaurant associated with the logged-in user
        const restaurant = await Restaurant.findOne({ user: req.id }).populate({
            path: "menus",
            options: { sort: { createdAt: -1 } },
        });

        // If the restaurant is not found, return an error
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found",
            });
        }

        // Return the menus of the restaurant
        return res.status(200).json({
            success: true,
            menus: restaurant.menus,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
