import { Link } from "react-router-dom";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { HandPlatter, Home, Loader2, Menu, Moon, PackageCheck, ShoppingCart, SquareMenu, Sun, User, UtensilsCrossed } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

import { Separator } from "./ui/separator";

import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";

const Navbar = () => {
    

    const { user, loading,logout } = useUserStore();
    const {cart} = useCartStore();

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between h-14">
                <Link to="/">
                    <h1 className="font-bold md:font-extrabold text-2xl">FoodExpress</h1>
                </Link>
                <div className="hidden md:flex items-center gap-10">
                    <div className="hidden md:flex items-center gap-6 ">
                        <Link to="/">Home</Link>
                        <Link to="/profile">Profile</Link>
                        <Link to="/order/status">Order</Link>
                        <Link to="/">Home</Link>

                    </div>
                    {
                        user?.admin && (
                            <Menubar>
                                <MenubarMenu>
                                    <MenubarTrigger>
                                        Dashboard
                                    </MenubarTrigger>
                                    <MenubarContent>
                                        <Link to="/admin/restaurant"><MenubarItem>Restaurent</MenubarItem></Link>
                                        <Link to="/admin/menu"><MenubarItem>Menu</MenubarItem></Link>
                                        <Link to="/admin/order"><MenubarItem>Order</MenubarItem></Link>
                                    </MenubarContent>
                                </MenubarMenu>
                            </Menubar>
                        )
                    }

                    <div className="flex items-center gap-4">
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span className="sr-only">Toggle theme</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem >
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Dark
                                    </DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <Link to="/cart" className="relative cursor-pointer">
                            <ShoppingCart />
                            {
                                cart.length>0 && (
                                    <Button size={'icon'} className="absolute -inset-y-3 left-2 test-xs rounded-full h-4 w-4 bg-red-500 hover:bg-red-500 ">{cart.length}</Button>
                                )
                            }
                        </Link>
                        <div>
                            <Avatar>
                                <AvatarImage src={user?.profilePicture} alt="ProfilePicture" />
                                <AvatarFallback>CN</AvatarFallback>

                            </Avatar>
                        </div>
                        <div>
                            {
                                loading ? <Button className="bg-orange hover:bg-hoverOrange"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</Button> :
                                    <Button onClick={logout} className="bg-orange hover:bg-hoverOrange">Logout
                                    </Button>

                            }
                        </div>
                    </div>
                </div>
                <div className="md:hidden lg:hidden">
                    {/* {Mobile responsive} */}
                    <MobileNavbar />
                </div>
            </div>
        </div>
    )
}

export default Navbar;

const MobileNavbar = () => {
    const { user,logout,loading } = useUserStore();
    const {cart}=useCartStore();
    return (

        <Sheet>
            <SheetTrigger asChild>
                <Button size={"icon"} className="rounded-full bg-gray-200 hover:bg-gray-200" variant="outline">
                    <Menu size={'18'} />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader className="flex flex-row items-center justify-between mt-2">
                    <SheetTitle>Food Express</SheetTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem >
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Dark
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </SheetHeader>
                <Separator className="my-2" />
                <SheetDescription className="flex-1 ">
                    <Link to="/" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
                        <Home />

                        <span>
                            Home</span>
                    </Link>
                    <Link to="/profile" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"><User />

                        <span>
                            Profile</span>
                    </Link>
                    <Link to="/order/status" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
                        <HandPlatter></HandPlatter>
                        <span>
                            Order</span>
                    </Link>
                    <Link to="/cart" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
                        <ShoppingCart />
                        <span>
                            Cart ({cart.length})</span>
                    </Link>
                    {
                        user?.admin && <>

                            <Link to="/admin/menu" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"><SquareMenu />
                                <span>
                                    Menu </span>
                            </Link>
                            <Link to="/admin/restaurant" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
                                <UtensilsCrossed />
                                <span>
                                    Restaurant</span>
                            </Link>
                            <Link to="/admin/order" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"><PackageCheck />
                                <span>
                                    Restuarant Orders</span>
                            </Link>
                        </>
                    }

                </SheetDescription>
                <SheetFooter >
                    <div className="flexflex-col items-center ">
                        <div className="flex flex-row items-center gap-2">
                            <Avatar>
                                <AvatarImage src={user?.profilePicture} alt="ProfilePicture" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h1 className="font-bold ">Sumanta Rakshit</h1>
                        </div>

                        <SheetClose asChild>
                        {
                                loading ? <Button className="bg-orange hover:bg-hoverOrange"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</Button> :
                                    <Button onClick={logout} className="bg-orange hover:bg-hoverOrange">Logout
                                    </Button>

                            }
                        </SheetClose>

                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )


}