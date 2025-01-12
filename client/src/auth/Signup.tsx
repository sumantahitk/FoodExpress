import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signupInputState, userSignupSchema } from "@/schema/userSchema";
// import { Label } from "@/components/ui/label";
import { Loader2, LockKeyhole, Mail, PhoneCall, User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

//this type declaration will be handle by ZOD 
// type signupInputState = {
//     fullname:string,
//     email: string,
//     password: string,
//     contact:string;

// }
const Signup = () => {
    const [input, setInput] = useState<signupInputState>({
        fullname: "",
        email: "",
        password: "",
        contact: ""
    })
    const [errors, setErrors] = useState<Partial<signupInputState>>({});
    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }
   
      
    
    const signupSubmitHandler = (e: FormEvent) => {
        e.preventDefault();
        const result = userSignupSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<signupInputState>);
            return;
        }//api implementation 
        console.log(input);
    }
    const loading = false;
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <form onSubmit={signupSubmitHandler} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4">
                <div className="mb-4">
                    <h1 className="font-bold text-2xl">FoodExpress</h1>
                </div>
                <div className="mb-4">
                    <div className="relative ">

                        <Input type="text" 
                        placeholder="Full Name"
                         value={input.fullname} 
                         name="fullname" 
                         onChange={changeEventHandler} 
                         className="pl-10 focus-visible:ring-1" />
                        <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {
                            errors && <span className="text-xs text-red-500">{errors.fullname}</span>
                        }
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative ">

                        <Input type="email" placeholder="Email" value={input.email} name="email" onChange={changeEventHandler} className="pl-10 focus-visible:ring-1" />
                        <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {
                            errors && <span className="text-xs text-red-500">{errors.email}</span>
                        }
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative ">

                        <Input type="password" placeholder="Password" name="password" value={input.password} onChange={changeEventHandler} className="pl-10 focus-visible:ring-1" />
                        <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {
                            errors && <span className="text-xs text-red-500">{errors.password}</span>
                        }
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative ">

                        <Input type="text" placeholder="Contact" value={input.contact} name="contact" onChange={changeEventHandler} className="pl-10 focus-visible:ring-1" />
                        <PhoneCall className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {
                            errors && <span className="text-xs text-red-500">{errors.contact}</span>
                        }
                    </div>
                </div>
                <div className="mb-8">
                    {
                        loading ? <Button disabled className="w-full bg-orange hover:bg-hoverOrange"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</Button> : <Button type="submit" className="w-full bg-orange hover:bg-hoverOrange">SignUp</Button>
                    }

                </div>
                <Separator />
                <p className="mt-2">Already have an account?{""}
                    <Link to="/login" className="text-blue-500">Login</Link>

                </p>
            </form>
        </div>
    );
};
export default Signup;