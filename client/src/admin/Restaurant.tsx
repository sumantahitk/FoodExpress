import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RestaurantFromSchema } from "@/schema/restaurantSchema";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Restaurant = () => {
    const [input, setInput] = useState<RestaurantFromSchema>({
        restaurantName: "",
        city: "",
        country: "",
        deliveryTime: 0,
        cuisines: [],
        imageFile: undefined,
    });
    const [errors,setErrors]=useState<Partial<RestaurantFromSchema>>({})
    const changeEventHandeler=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value,type}=e.target;
        setInput({...input,[name]:type==='number' ? Number(value) :value});
    }
    const submitHandler=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const result=RestaurantFromSchema.safeParse(input);
        if(!result.success){
            const fieldErrors=result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<RestaurantFromSchema>);
            return;
        }
        console.log(input);
    }
    const loading = false;
    const restaurantExist = false;
    return (
        <div className="max-w-7xl mx-auto my-10">
            <div>
                <div>
                    <h1 className="font-extrabold test-2xl mb-5">Add Restaurant</h1>
                    <form onSubmit={submitHandler}>
                        <div className="md:grid grid-cols-2 gap-6 space-y-3 md:space-y-0">
                            {/* Restaurant name */}
                            <div className="text-left">
                                <Label >Restaurant Name</Label>
                                <Input
                                    type="text"
                                    value={input.restaurantName}
                                    name="restaurantName"
                                    onChange={changeEventHandeler}
                                    placeholder="Enter your restaurant name"
                                />
                                {
                                    errors && <span className="text-xs text-red-600 font-medium">{errors.restaurantName}</span>
                                }
                            </div>
                            <div className="text-left">
                                <Label>City</Label>
                                <Input
                                    type="text"
                                    value={input.city}
                                    name="city"
                                    onChange={changeEventHandeler}
                                    placeholder="Enter your city name"

                                />
                                {
                                    errors && <span className="text-xs text-red-600 font-medium">{errors.city}</span>
                                }
                            </div>
                            <div className="text-left">
                                <Label>Country</Label>
                                <Input
                                    type="text"
                                    value={input.country}
                                    name="country"
                                    onChange={changeEventHandeler}
                                    placeholder="Enter your country name"

                                />
                                {
                                    errors && <span className="text-xs text-red-600 font-medium">{errors.country}</span>
                                }
                            </div>
                            <div className="text-left">
                                <Label>Delivery Time</Label>
                                <Input
                                    type="number"
                                    value={input.deliveryTime}
                                    name="deliveryTime"
                                    onChange={changeEventHandeler}
                                    placeholder="Enter your delivery time "

                                />
                                {
                                    errors && <span className="text-xs text-red-600 font-medium">{errors.deliveryTime}</span>
                                }
                            </div>
                            <div className="text-left">
                                <Label>Cuisines</Label>
                                <Input
                                    type="text"
                                    value={input.cuisines}
                                    name="cuisines"
                                    onChange={(e)=>setInput({...input,cuisines:e.target.value.split(",")})}
                                    placeholder="e.g. Momos, Thukpa, Sel roti..."

                                />
                                {
                                    errors && <span className="text-xs text-red-600 font-medium">{errors.cuisines}</span>
                                }
                            </div>
                            <div className="text-left">
                                <Label >Upload Restaurant Banner</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    name="imageFile"
                                    onChange={(e)=>setInput({...input,imageFile:e.target.files?.[0] ||undefined })}
                                    placeholder="Enter your restaurant name"

                                />
                                {
                                    errors && <span className="text-xs text-red-600 font-medium">{errors.imageFile?.name|| ""}</span>
                                }
                            </div>
                        </div>
                        <div className="m-5">
                            {
                                loading ? (
                                    <Button disabled className="bg-orange hover:bg-hoverOrange"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</Button>
                                ) : (
                                    <Button className="bg-orange hover:bg-hoverOrange">{restaurantExist ? 'Update Your Restaurant' : ' Add Your Restaurant'}</Button>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
export default Restaurant;