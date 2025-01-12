import { z } from "Zod";

export const userSignupSchema = z.object({
    fullname: z.string().min(2, "Fullname is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    contact: z.string().min(10, "Contact number must be 10 digit").max(10,"Contact no. can't exceed 10 "),
})
export type signupInputState=z.infer<typeof userSignupSchema>


export const userLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})
export type LoginInputState=z.infer<typeof userLoginSchema>    