import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";
import CheckOutConfirmPage from "./CheckOutConfirmPage";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import {CartItem } from "@/type/cartType";

const Cart = () => {
    const [open, setOpen] = useState<boolean>(false);
    const {cart,incrementQuantity,removeFromTheCart,clearCart,decrementQuantity}=useCartStore();
    let totalAmount=cart.reduce((acc,ele)=>{
        return acc+ele.price*ele.quantity;
    },0)
     
    return (
        <div className="flex flex-col max-w-7xl mx-auto my-10">
            <div className="flex justify-end">
                <Button onClick={()=>clearCart()} variant="link">Clear All</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow >
                        <TableHead className="text-center">Items</TableHead>
                        <TableHead className="text-center">Titles</TableHead>
                        <TableHead className="text-center">Prices</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-center">Total</TableHead>
                        <TableHead className="text-right">Remove</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        cart.map((item:CartItem)=>(
                            <TableRow>
                            <TableCell >
                                <Avatar className="flex items-center justify-center mx-auto">
                                    <AvatarImage src={item.image} alt="" />
                                    <AvatarFallback>SR</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell >{item.name}</TableCell>
                            <TableCell >{item.price}</TableCell>
                            <TableCell className="align-middle text-center" >
                                <div className=" flex flex-row items-center justify-center gap-2">
                                    <Button onClick={()=>decrementQuantity(item._id) } size={'icon'} variant={"outline"} className="text-center rounded-full bg-gray-200"><Minus /></Button>
                                    <Button disabled variant={"outline"} size={'icon'} className="font-bold  border-none">{item.quantity}</Button>
                                    <Button onClick={()=>incrementQuantity(item._id)} size={'icon'} variant={"outline"} className="rounded-full bg-orange hover:bg-hoverOrange"><Plus /></Button>
                                </div>
                            </TableCell>
                            <TableCell >{item.price*item.quantity}</TableCell>
                            <TableCell onClick={()=>removeFromTheCart(item._id)} className="text-right"><Button size={'sm'} className="bg-orange hover:bg-hoverOrange ">Remove</Button></TableCell>
                        </TableRow>
                        ))
                    }
    
                </TableBody>
                <TableFooter >
                    <TableRow className="text-2xl font-bold">
                        <TableCell colSpan={5} className="text-left pl-20">Total</TableCell>
                        <TableCell className="text-right">{Number(totalAmount)}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <div className="flex justify-end my-5">
                <Button onClick={() => { setOpen(true) }} className="bg-orange hover:bg-hoverOrange">Proceed To Checkout</Button>

            </div>
            <CheckOutConfirmPage open={open} setOpen={setOpen} />
        </div>
    )
}
export default Cart;