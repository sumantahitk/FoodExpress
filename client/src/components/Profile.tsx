import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { Loader2, LocateIcon, Mail, MapPin,  MapPinnedIcon, Phone, Plus } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";


const Profile = () => {
    const imageRef = useRef<HTMLInputElement | null>(null);
    const {user,updateProfile}=useUserStore();
    const [isLoading,setIsLoading]=useState<boolean>(false);
    const [profileData, setProfileData] = useState({
        fullname: user?.fullname||"",
        email: user?.email||"",
        phone: user?.contact||"",
        address: user?.address||"",
        city: user?.city||"",
        country: user?.country||"",
        profilePicture: user?.profilePicture||"",

    })
    const [selectedDp, setSelectedDp] = useState<string>(profileData?.profilePicture||"");
    
    const fileChangeHandeler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // const file = e.target.files?.[0];
        // console.log(file);
        // if (file) {
        //     const reader = new FileReader();
        //     reader.onloadend = () => {
        //         const result = reader.result as string;
        //         setSelectedDp(result);
        //         setProfileData((prevData) => ({
        //             ...prevData, profilePicture: result
        //         }))
        //     };
        //     reader.readAsDataURL(file);
        // }
        const file = e.target.files?.[0];
        if (file) {
            setSelectedDp(URL.createObjectURL(file)); // Set the preview image
            setProfileData((prevData:any) => ({
                ...prevData,
                profilePicture: file // Store the file object for FormData
            }));
        }
        
    }
    const changeHandeler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value })
    }
    const updateProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(profileData);
        try{
            setIsLoading(true);
            await updateProfile(profileData);
            setIsLoading(false);
        }catch(error){
            setIsLoading(false);
            console.log(error);
        }
    }
    return (
        <form onSubmit={updateProfileHandler} className="max-w-7xl mx-auto my-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-4">
                    <Avatar className="relative md:h-28 md:w-28 w-24 h-18">
                        <AvatarImage src={selectedDp} className="rounded-full h-26 w-22 md:h-28 md:w-28 "/>
                        <AvatarFallback>SR</AvatarFallback>
                        <input 
                        ref={imageRef} 
                        className="hidden"
                         type="file"
                          accept="image/*" 
                          onChange={fileChangeHandeler} 
                          />
                        <div onClick={() => imageRef.current?.click()} 
                         className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer "
                        >
                            <Plus className="text-white w-8 h-8" />
                        </div>

                    </Avatar>
                   
                        <Input
                            type="text"
                            name="fullname"
                            value={profileData.fullname}
                            onChange={changeHandeler}
                            className="px-0 font-bold text-2xl outline-none border-none focus-visible:ring-transparent"
                        />
                   
                </div>
            </div>
            <div className="grid md:grid-cols-5  gap-3 md:gap-2  my-10 ">
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                    <Mail className="text-gray-500" />
                    <div className="w-full">
                        {/* <Label className="text-left">Email</Label> 
                        */}
                        <h4 className=" text-left text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-0">Email</h4>
                        <input
                        disabled
                            name="email"
                            value={profileData.email}
                            onChange={changeHandeler}
                            className="w-full text-gray-600 bg-gray-200 bg-transparent:ring-0 focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                    <LocateIcon className="text-gray-500" />
                    <div className="w-full">
                        {/* <Label className="ml-0">Address</Label> */}
                        <h4 className=" text-left text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-0">Address</h4>
                        <input
                            name="address"
                            value={profileData.address}
                            onChange={changeHandeler}
                            className="w-full text-gray-600 bg-gray-200 bg-transparent:ring-0 focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                    <Phone className="text-gray-500" />
                    <div className="w-full">
                        {/* <Label className="ml-0">Address</Label> */}
                        <h4 className=" text-left text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-0">Mobile</h4>
                        <input
                            name="phone"
                            value={profileData.phone}
                            onChange={changeHandeler}
                            className="w-full text-gray-600 bg-gray-200 bg-transparent:ring-0 focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                    <MapPin className="text-gray-500" />
                    <div className="w-full">
                        {/* <Label className="ml-0">City</Label> */}
                        <h4 className=" text-left text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-0">City</h4>
                        <input
                            name="city"
                            value={profileData.city}
                            onChange={changeHandeler}
                            className="w-full text-gray-600 bg-gray-200 bg-transparent:ring-0 focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                    <MapPinnedIcon className="text-gray-500" />
                    <div className="w-full">
                        {/* <Label className="ml-0">Country</Label> */}
                        <h4 className=" text-left text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-0">Country</h4>
                        <input
                            name="country"
                            value={profileData.country}
                            onChange={changeHandeler}
                            className="w-full text-gray-600 bg-gray-200 bg-transparent:ring-0 focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>

            </div>
            <div className="text-center">
                {
                    isLoading ? (
                        <Button disabled className="bg-orange hover:bg-hoverOrange"><Loader2 className="animate-spin mr-2 w-4 h-4" />Please Wait</Button>
                    ) :
                        (
                            <Button className="bg-orange hover:bg-hoverOrange">Update</Button>
                        )
                }
            </div>
        </form>
    )
}

export default Profile;