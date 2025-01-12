import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import heroImage from "@/assets/hero_pizza.png";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
    const [searchText, setSearchText] = useState<string>("");
    const navigate=useNavigate();
    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto lg:p-10 py-10 px-5rounded-lg items-center justify-center m-4 gap-20">
            <div className="flex flex-col gap-10 md:w-[50%] ">
                <div className="flex flex-col gap-5">
                    <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">Order Food anytime & anywhere</h1>
                    <p className="text-base  text-gray-500">Hey! Delicios food is waiting for you,we are always near to you</p>
                </div>
                <div className="relative flex items-center">

                    <Input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className=" p-0 pl-9 shadow-lg focus-visible:ring-0 w-full  text-wrap" placeholder="Search restaurant by name ,city & country"
                    />
                    <Search className=" text-gray-600 absolute inset-y-2 left-2" />

                    <Button onClick={()=>navigate(`/search/${searchText}`)} className="bg-orange hover:bg-hoverOrange sm:w-20 px-2 ">Search</Button>
                </div>
            </div>
            <div>
                <img src={heroImage} alt="" className="object-cover w-full max-h-[500px]" />
            </div>
        </div>
    )
}
export default HeroSection;