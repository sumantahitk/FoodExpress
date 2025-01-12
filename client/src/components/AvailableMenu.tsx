import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "@/assets/restaurant_image.jpg"
import { Skeleton } from "./ui/skeleton";
const AvailableMenu=()=>{
    return(
        <div className="md:p-4">
            <h1 className="text-xl md:text-2xl font-extrabold mb-6">Available Menu</h1>
            <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
        <Card className="md:max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
        <img src={Image} alt="restaurant_img" className="object-cover h-48 w-full rounded-lg shadow-lg"/>
        <CardContent className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Tandoori Biryani</h2>
        <p className="text-sm text-gary-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        <h3 className="text-lg font-semibold mt-4">Price: <span className="text-[#D19254]">₹80</span></h3>
        </CardContent>
        <CardFooter className="p-4">
            <Button className="w-full bg-orange hover:bg-hoverOrange ">Add to Cart</Button>
        </CardFooter>
        </Card>
            </div>
        </div>
    )
}
export default AvailableMenu;


const AvailableMenuSkeleton = () => {
    return (
      <div className="md:p-4">
        <Skeleton className="h-8 w-1/3 mb-6" />
        <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
          {[...Array(3)].map((_, index) => (
            <Card
              key={index}
              className="md:max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden"
            >
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-4">
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-6 w-1/3" />
              </CardContent>
              <CardFooter className="p-4">
                <Skeleton className="h-10 w-full rounded-md" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  