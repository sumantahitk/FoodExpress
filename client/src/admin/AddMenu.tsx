import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { FormEvent, useState } from "react";

import EditMenu from "./EditMenu";
import { MenuFromSchema, MenuSchema } from "@/schema/MenuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";

const menus = [{
    name: "Biryani",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    price: "80",
    imagemenu: "https://sp.yimg.com/ib/th?id=OIP.5KQadrKDA6f-XA7_DkX1KwHaE7&pid=Api&w=148&h=148&c=7&dpr=2&rs=1"
}, {
    name: "Pizza",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    price: "120",
    imagemenu: "https://sp.yimg.com/ib/th?id=OIP.UyZTyeH-PiI5WVuhStfN2QHaE7&pid=Api&w=148&h=148&c=7&dpr=2&rs=1"
}, {
    name: "Kadhai Paneer",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    price: "70",
    imagemenu: "https://sp.yimg.com/ib/th?id=OIP.8Ycm3kdMWqt35oJRet6IhAHaJ4&pid=Api&w=148&h=148&c=7&dpr=2&rs=1"
}, {
    name: "Biryani",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    price: "80",
    imagemenu: ""
},]
const AddMenu = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);
 
    const [errors, setErrors] = useState<Partial<MenuFromSchema>>({})
    const [selectedMenu, setSelectedMenu] = useState<any>()

    const {loading,createMenu}=useMenuStore();
    const {restaurant}=useRestaurantStore();
    
    console.log(restaurant)
    const [input, setInput] = useState<MenuFromSchema>({
        name: "",
        description: "",
        price: 0,
        imagemenu: undefined
    })
    const changeEventHandeler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setInput({ ...input, [name]: type === 'number' ? Number(value) : value });
    }
    const submitHandeler =async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = MenuSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<MenuFromSchema>);
            return;
        }        
        // console.log(input);
        try{
            const formData=new FormData();
            formData.append('name',input.name);
            formData.append('description',input.description);
            formData.append('price',input.price.toString());
           if(input.imagemenu){
            formData.append('imagemenu',input.imagemenu);
           }
           await createMenu(formData);
        }catch(error){
            console.log(error);

        }
       
    }
    
    return (
        <div className="max-w-6xl mx-auto my-10">
            <div className="flex justify-between">
                <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">Available Menus</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                        <Button className="bg-orange hover:bg-hoverOrange"><Plus className="mr-2" />Add Menus</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add a new menu</DialogTitle>
                            <DialogDescription>
                                create a menu that will make your restaurant stand out...
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submitHandeler} className="space-y-4">
                            <div>
                                <Label>Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandeler}
                                    placeholder="Enter menu name"
                                />
                                {errors && <span className="text-xs font-medium text-red-600">{errors.name}</span>}
                            </div>
                            <div>
                                <Label>Description</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandeler}
                                    placeholder="Enter menu description"
                                />
                                {errors && <span className="text-xs font-medium text-red-600">{errors.description}</span>}
                            </div>
                            <div>
                                <Label>Price in (Rupees)</Label>
                                <Input
                                    type="number"
                                    name="price"
                                    value={input.price}
                                    onChange={changeEventHandeler}
                                    placeholder="Enter menu price"
                                />
                                {errors && <span className="text-xs font-medium text-red-600">{errors.price}</span>}
                            </div>
                            <div>
                                <Label>Upload Menu image</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    name="imagemenu"
                                    // value={input.imagemenu}
                                    onChange={(e) => setInput({ ...input, imagemenu: e.target.files?.[0] || undefined })}
                                    placeholder="image"
                                />
                                {errors && <span className="text-xs font-medium text-red-600">{errors.imagemenu?.name }</span>}
                            </div>
                            <DialogFooter className="mt-5">
                                {
                                    loading ? (
                                        <Button disabled className="bg-orange hover:bg-hoverOrange"><Loader2 className="animate-spin mr-2 w-4 h-4" />Please Wait</Button>
                                    ) : (
                                        <Button className="bg-orange hover:bg-hoverOrange">Submit</Button>
                                    )
                                }
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            {
        
                restaurant?.menus?.map((menu: any, idx: number) =>
                    <div className="mt-6 space-y-4">
                        <div className="flex flex-row md:items-center md:space-x-12 md:p-4 p-2 shadow-md rounded-md border">
                            <img
                                src={menu?.imagemenu || "https://sp.yimg.com/ib/th?id=OIP.BCmR2pQCukP_1teyVept3wHaE7&pid=Api&w=148&h=148&c=7&dpr=2&rs=1"}
                                alt="menu image"
                                className="md:h-24 md:w-24 h-20 w-16 object-cover"

                            />
                            <div className="flex-1 text-start ml-4  ">
                                <h1 className="text-lg font-semibold text-gray-800">{ menu?.name}</h1>
                                <p className="text-sm text-gray-600 mt-1">{menu?.description}</p>
                                <h2 className="text-md font-semibold mt-2">Price:<span className="text-[#d19254]">{menu?.price}</span></h2>
                            </div>
                            <Button
                                onClick={() => {
                                    setSelectedMenu(menu);
                                    setEditOpen(true);
                                }} className="bg-orange hover:bg-hoverOrange mt-2 md:w-24">Edit</Button>
                        </div>
                    </div>
                )
            }


            <EditMenu selectedMenu={selectedMenu} editOpen={editOpen} setEditOpen={setEditOpen} />
        </div>
    )
}
export default AddMenu;