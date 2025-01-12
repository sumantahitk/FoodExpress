import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

const VerifyEmail=()=>{
    const [otp,setOtp]=useState<string[]>(["","","","","",""]);
    const inputRef=useRef<any>([]);
    // const navigate=useNavigate();
    const loading=true;
    const handleChange=(index:number,value:string)=>{
        if(/^[a-zA-Z0-9]$/.test(value)||value===""){
            const newOtp=[...otp];
            newOtp[index]=value;
            setOtp(newOtp);
        }
        //Move to the next input field if a digit is entered
        if(value!=="" && index<5){
            inputRef.current[index+1].focus();
        }
    }
    const handleKeyDown=(index:number,e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key==="Backspace" && !otp[index] && index>0){
            inputRef.current[index-1].focus();
        }
    }
    return (
        <div className="flex items-center justify-center h-screen ">
           <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gry-200">
        <div className="text-center">
           <h1 className="font-extrabold text-2xl">Verify your email</h1>
           <p className="text-sm text-gray-600">Enter this 6 digit code to your email address</p>
        </div>
        <form action="">
            <div className="flex  justify-between">
                {
                    otp.map((letter:string,idx:number)=>(
                    <Input
                    key={idx}
                    ref={(element)=>(inputRef.current[idx]=element)}
                    type="text"
                    maxLength={1}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
                        handleChange(idx,e.target.value)
                    }
                    onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>)=>handleKeyDown(idx,e)}
                    value={letter}
                    className="md:w-12 md:h-12 w-8 text-center text-sm h-8 md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 "
                    />
                    ))
                }
            </div>
            {
                loading?<Button disabled className="bg-orange hover:bg-hoverOrange mt-6 w-full"><Loader2 className="mr-2 w-4 h-4 animate-spin"/>Please Wait</Button> :<Button className="bg-orange hover:bg-hoverOrange mt-6 w-full">Verify</Button>
            }
        </form>
           </div>
        </div>
    );
};
export default VerifyEmail;