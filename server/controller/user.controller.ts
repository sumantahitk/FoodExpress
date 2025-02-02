import { Response, Request, NextFunction } from "express"
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import cloudinary from "../utils/cloudnary";
import { generateVerificationCode } from "../utils/generateVerificationToken";
import { generateToken } from "../utils/generateToken";
import { sendPasswordRsetEmail, sendResetSuccessEmail, sendverificationEmail, sendWelcomeEmail } from "../mailtrap/email";
import uploadImageOnCloudinary from "../utils/imageUpload";

export const signup = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        // console.log("Signup controller hit:", req.body);
       
        const { fullname, email, password, contact } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"
            });
        }
       
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(req.body)
        const verificationToken = generateVerificationCode();
       
        user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            contact: Number(contact),
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        })

       
        generateToken(res,user);
        // console.log(user)
//send mail for verification
        await sendverificationEmail(email,verificationToken);
console.log("hi ")
        const userWithoutPassword = await User.findOne({ email }).select("-password");
        console.log(userWithoutPassword);
        return res.status(201).json({
            success: true,
            message: "Account created Successfully",
            user: userWithoutPassword
        })


    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: "Error signing up user" })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);


        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }

        generateToken(res,user)
        user.lastLogin = new Date();

        await user.save();

        const userWithoutPassword = await User.findOne({ email }).select("-password");
        return res.status(200).json({
            success: true,
            message: `Welcome back ${user.fullname}`,
            user: userWithoutPassword
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
};


export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { verificationCode } = req.body;
        // console.log(verificationCode);
        const user = await User.findOne({ verificationToken: verificationCode, verificationTokenExpiresAt: { $gt: Date.now() } }).select("-password");


        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid verification code or expired" })
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();

            //send welcome email
        await sendWelcomeEmail(user.email,user.fullname);

        return res.status(200).json({
            success: true,
            message: `Email Verified successfully`,
            user,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const logout = async (_: Request, res: Response) => {
    try {
        return res.clearCookie("token").status(200).json({
            success: true,
            message: "Logged out successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User doesn't exist" })
        };

        const restToken = crypto.randomBytes(40).toString('hex');
        const restTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
        user.resetPasswordToken = restToken;
        user.resetPasswordTokenExpiresAt = restTokenExpiresAt;


        await user.save();

        //send Email for reset password

           await sendPasswordRsetEmail(user.email,`${process.env.FRONTEND_URL}/resetpassword/${restToken}`);



        return res.status(200).json({
            success: true,
            message: `Password reset link sent to your email`,

        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        const user = await User.findOne({
            resetPasswordToken: token, resetPasswordTokenExpiresAt:
                { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token"
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;
        await user.save();


        //send success reset email

        await sendResetSuccessEmail(user.email)
        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const checkAuth = async (req: Request, res: Response) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        };
        return res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

// export const updateProfile = async (req: Request, res: Response) => {
//     try {
//         const userId = req.id;
//         const { fullname, email,contact, address, city, country } = req.body;
//         const file=(req.file)
       
// const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
//         const updatedData = { fullname, email,contact, address, city, country ,profilePicture:imageUrl||file};
//         // console.log("update",updateProfile);

//         const user = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");

//         return res.status(200).json({
//             success: true,
//             message: "Profile updated successfully",
//             user
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal server error" })
//     }
// }

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.id;
        const { fullname, email, contact, address, city, country } = req.body;
        const file = req.file;

        // Check if a new file (image) is provided, if yes, upload it to Cloudinary
        let imageUrl: string | undefined = undefined;
        if (file) {
            imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
        }

        // Prepare the updated data object
        const updatedData: { [key: string]: any } = { fullname, email, contact, address, city, country };

        // If a new image is provided, add the profilePicture field to the updatedData object
        if (imageUrl) {
            updatedData.profilePicture = imageUrl;
        }

        // Update the user profile in the database
        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

