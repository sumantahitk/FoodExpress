export type MenuItem = {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}
export type Restaurant = {
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryTime: number;
    cuisines: string[];
    menus: MenuItem[];
    imageUrl: string;
}

export type searchedRestaurant={
    data:Restaurant[]
}

export type RestaurantState={
    loading:boolean,
    restaurant:Restaurant|null,
    searchedRestaurant:searchedRestaurant|null,
    appliedFilter:string[],
    singleRestaurant:Restaurant|null,
    createRestaurant:(formdata:FormData)=>Promise<void>;
    getRestaurant:()=>Promise<void>;
    updateRestaurant:(formdata:FormData)=>Promise<void>;
    searchRestaurant:(searchText:string,searchQuery:string,selectedCuisines:any)=>Promise<void>;
    addMenuToRestaurant:(menu:MenuItem)=>void,
    updateMenuToRestaurant:(menu:MenuItem)=>void;
    setAppliedFilter:(value:string)=>void;
    resetAppliedFilter:()=>void;
    getSingleRestaurant:(restaurantId:string)=>Promise<void>;
}