import jwt from 'jsonwebtoken';
import { IuserDocument } from '../models/user.model';
import { Response } from 'express';
export const generateToken = (res: Response, user: IuserDocument) => {
    try {
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY!, { expiresIn: '1d' });
        res.cookie("token", token, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 })
        return token;
    } catch (error) {
        console.log(error);
    }
}