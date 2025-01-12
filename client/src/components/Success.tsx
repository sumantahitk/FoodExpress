import Image from "@/assets/restaurant_image_2.jpg"
import { IndianRupee } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
const Success = () => {
    const orders = [1, 2, 3];
    if (orders.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen ">
                <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300 sm:mb-40">Order Not Found !</h1>
            </div>
        )
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gary-200">Order Status:{" "}
                        <span className="text-[#d19254]">{"confirm".toUpperCase()}</span>
                    </h1>
                </div>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-600 dark:text-gary-300 mb-4">Order Summary</h2>
                    {/* your order items dispaly here */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <img
                                    src={Image}
                                    alt=""
                                    className="w-14 h-14 object-cover rounded-md"
                                />
                                <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">Panner</h3>
                            </div>
                            <div className="text-right">
                                <div className="text-gray-800 dark:text-gary-200 flex items-center">
                                    <IndianRupee />
                                    <span className="text-lg font-medium">80</span>
                                </div>
                            </div>
                        </div>
                        <Separator className="my-4"/>
                    </div>
                </div>
                <Link to="/">
                <Button className="bg-orange hover:bg-hoverOrange w-full py-3 rounded-md shadow-lg ">Continue Shopping</Button>
                </Link>
            </div>
        </div>
    )

}
export default Success;