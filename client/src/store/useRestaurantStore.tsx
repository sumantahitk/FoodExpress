import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";



// type RestaurantState ={
//     loading:boolean,
//     restaurant:null,
//     restaurantResult:null,
// }
// type RestaurantState={
//     loading:boolean,
//     restaurant:null,
//     searchedRestaurant:null,
//     createRestaurant:(formdata:FormData)=>Promise<void>;
//     getRestaurant:()=>Promise<void>;
//     updateRestaurant:(formdata:FormData)=>Promise<void>;
//     searchRestaurant:(searchText:string,searchQuery:string,selectedCuisines:any)=>Promise<void>;
//     addMenuToRestaurant:(menu:any)=>void,
//     updateMenuToRestaurant:(menu:any)=>void;

// }
const API_END_POINT = "http://localhost:8000/api/v1/restaurant";
axios.defaults.withCredentials = true;
export const useRestaurantStore = create<any>()(persist((set) => ({
    loading: false,
    restaurant: null,
    searchedRestaurant: null,
    createRestaurant: async (formData: FormData) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response.data.success) {
                set({ loading: false });
                toast.success(response.data.message);
            }
        } catch (err: any) {
            set({ loading: false });
            toast.error(err.response.data.message);
        }
    },
    getRestaurant: async () => {
        try {
            set({ loading: true });
            const response = await axios.get(`${API_END_POINT}/`)
            if (response.data.success) {
                set({ loading: false, restaurant: response.data.restaurant });
                toast.success(response.data.message);
            }
            return
        } catch (err: any) {
            if (err.response.status === 404) {
                set({ restaurant: null });
            }
            set({ loading: false });
            toast.error(err.response.data.message);
        }
    },
    updateRestaurant: async (formData: FormData) => {
        try {
            set({ loading: true });
            const response = await axios.put(`${API_END_POINT}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response.data.success) {
                set({ loading: false });
                toast.success(response.data.message);
            }
        } catch (err: any) {
            set({ loading: false });
            toast.error(err.response.data.message);
        }
    },
    searchRestaurant: async (searchText: string, searchQuery: string, selectedCuisines: any) => {
        try {
            set({ loading: true });
            const params = new URLSearchParams();
            params.set("searchQuery", searchQuery);
            params.set("selectedCuisines", selectedCuisines);

            const response = await axios.get(`${API_END_POINT}/search/${searchText}?searchQuery=${searchQuery}?${params.toString()}`, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response.data.success) {
                set({ loading: false, searchedRestaurant: response.data });
                toast.success(response.data.message);
            }
        } catch (err: any) {
            set({ loading: false });
            toast.error(err.response.data.message);
        }
    },
    addMenuToRestaurant: (menu: any) => {
        try {
            set((state: any) => ({
                restaurant: state.restaurant ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] } : { menus: menu },
            }))
        } catch (error) {
            console.log('Error adding menu to restaurant')
            console.log(error);
        }
    },
    updateMenuToRestaurant: (updatedMenu: any) => {
        set((state: any) => {
            if (state.restaurant) {
                const updatedMenuList = state.restaurant.menus.map((menu: any) => menu._id === updatedMenu._id ? updatedMenu : menu)
                return {
                    restaurant: {
                        ...state.restaurant, menus: updatedMenuList
                    }
                }
            }
        })
    }

}), {
    name: 'restaurant-name',
    storage: createJSONStorage(() => localStorage)
}))