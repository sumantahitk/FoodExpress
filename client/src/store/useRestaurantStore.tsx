import { Orders } from "@/type/orderType";
import { MenuItem, RestaurantState } from "@/type/restaurantType";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";



const API_END_POINT = "http://localhost:8000/api/v1/restaurant";
axios.defaults.withCredentials = true;
export const useRestaurantStore = create<RestaurantState>()(persist((set, get) => ({
    loading: false,
    restaurant: null,
    searchedRestaurant: null,
    appliedFilter: [],
    singleRestaurant: null,
    restaurantOrder: [],
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
        } catch (error: any) {
            if (error.response.status === 404) {
                set({ restaurant: null });
            }
            set({ loading: false });
            toast.error(error.response.data.message);
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
            params.set("selectedCuisines", selectedCuisines.join(","));

            //create some delay for show skeleton
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const response = await axios.get(`${API_END_POINT}/search/${searchText}?${params.toString()}`, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            // console.log(response.data)
            if (response.data.success) {
                // console.log(response.data)
                set({ loading: false, searchedRestaurant: response.data });
                toast.success(response.data.message);
            }
        } catch (err: any) {
            set({ loading: false });
            toast.error(err.response.data.message);
        }
    },
    addMenuToRestaurant: (menu: MenuItem) => {
        try {
            set((state: any) => ({
                restaurant: state.restaurant ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] } : { menus: menu },
            }))
        } catch (error) {
            console.log('Error adding menu to restaurant')
            console.log(error);
        }
    },
    updateMenuToRestaurant: (updatedMenu: MenuItem) => {
        set((state: any) => {
            if (state.restaurant) {
                const updatedMenuList = state.restaurant.menus.map((menu: any) => menu._id === updatedMenu._id ? updatedMenu : menu)
                return {
                    restaurant: {
                        ...state.restaurant, menus: updatedMenuList
                    }
                }
            }
            return state;
        })

    },
    setAppliedFilter: (value: string) => {
        set((state: any) => {
            const isAlreadyApplied = state.appliedFilter.includes(value);
            const updatedFilter = isAlreadyApplied ? state.appliedFilter.filter((item: any) => item !== value) : [...state.appliedFilter, value];
            return { appliedFilter: updatedFilter }
        })
    },
    resetAppliedFilter: () => {
        set({ appliedFilter: [] })
    },
    getSingleRestaurant: async (restaurantId: string) => {
        try {
            const response = await axios.get(`${API_END_POINT}/${restaurantId}`);

            if (response.data.success) {
                set({ singleRestaurant: response.data.restaurant })
            }
        } catch (error) {
            console.log('Error fetching single restaurant')
        }
    },
    getRestaurantOrders: async () => {
        try {
            const response = await axios.get(`${API_END_POINT}/order`);
            if (response.data.success) {
                // console.log(response.data.orders);  
                set({ restaurantOrder: response.data.orders })
            }
        } catch (error) {
            console.log('Error fetching restaurant orders', error);

        }
    },
 
    updateRestaurantOrder: async (orderId: string, status: string) => {
        try {
            const response = await axios.put(`${API_END_POINT}/order/${orderId}/status`, {
                status
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.data.success) {
                // Update the state with the new status
                const updatedOrder = get().restaurantOrder.map((order: Orders) => {
                    return order._id === orderId ? { ...order, status: response.data.status } : order;
                });
    
                // Update the restaurantOrder state
                set({ restaurantOrder: updatedOrder });
    
                // Display a success toast
                toast.success('Order Update Successfully');
            }
        } catch (error: any) {
            console.log('Error updating restaurant order', error);
            toast.error('failed to update status');
        }
    }
    

}), {
    name: 'restaurant-name',
    storage: createJSONStorage(() => localStorage)
}))