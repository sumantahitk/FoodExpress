import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword=()=>{
    const [newPassword,setNewPassword]=useState<string>("");
    const loading=false;
    return (

        <div className="flex items-center justify-center min-h-screen w-full">
            <form className="flex flex-col gap-5 md:border md:p-8 w-full max-w-md rounded-lg mx-4">
        <div className="text-center">
            <h1 className="font-extrabold text-2xl mb-2">Reset Your Password</h1>
            <p className="text-sm text-gray-600 ">Enter your New Password </p>
        </div>
        <div className="relative">
            <Input 
            type="text"
            value={newPassword}
            name="newPassword"
            onChange={(e)=>setNewPassword(e.target.value)}
            placeholder="Enter Your New Password "
            className="pl-10"
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"></LockKeyhole>
        </div>
        {
            loading?(
                <Button disabled className="bg-orange hover:bg-hoverOrange"><Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2></Button>
            ):<Button className="bg-orange hover:bg-hoverOrange">Reset</Button>
        }
        <span className="text-center">
            Back to {""}
            <Link to="/login" className="text-blue-500">Login</Link>
        </span>
            </form>
        </div>
    );
};
export default ResetPassword;