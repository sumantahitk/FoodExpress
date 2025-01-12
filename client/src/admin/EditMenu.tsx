import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuFromSchema, MenuSchema } from "@/schema/MenuSchema";
import { Loader2 } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";

const EditMenu = ({ selectedMenu, editOpen, setEditOpen }: { selectedMenu: MenuFromSchema; editOpen: boolean; setEditOpen: Dispatch<SetStateAction<boolean>>; }) => {
    const [input, setInput] = useState<MenuFromSchema>({
        name: "",
        description: "",
        price: 0,
        imagemenu: undefined
    })
    const loading = false;
    const [errors, setErrors] = useState<Partial<MenuFromSchema>>({})
    const changeEventHandeler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setInput({ ...input, [name]: type === 'number' ? Number(value) : value });
    }
    const submitHandeler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
         const result = MenuSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<MenuFromSchema>);
            return;
        }    
        // console.log(input);
    }

    useEffect(() => {
        setInput({
            name: selectedMenu?.name||"",
            description: selectedMenu?.description||"",
            price: selectedMenu?.price||0,
            imagemenu: undefined
        })
    }, [])

    return (
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Menu</DialogTitle>
                    <DialogDescription>
                        Update your menu to keep your offering fresh and exciting !
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
                        {errors && <span className="text-xs font-medium text-red-600">{errors.imagemenu?.name}</span>}
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
    )
}
export default EditMenu; 