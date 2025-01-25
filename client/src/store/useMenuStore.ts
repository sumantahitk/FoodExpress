import axios from "axios";
import { toast } from "sonner";
import {create} from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { useRestaurantStore } from "./useRestaurantStore";

const API_END_POINT ="http://localhost:8000/api/v1/menu";
type MenuState={
    loading:boolean,
    menu:null,
    createMenu:(formData:FormData)=>Promise<void>;
    editMenu:(menuId:string,formData:FormData)=>Promise<void>;
    getMenu: () => Promise<void>; 

}
export const useMenuStore= create<MenuState>()(persist((set)=>({
    loading:false,
    menu:null,
    createMenu:async(formData:FormData)=> {
        try{
            set({loading:true});
            const response= await axios.post(`${API_END_POINT}/`,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });
            if(response.data.success){
                set({loading:false,menu:response.data.menu});
                toast.success(response.data.message);
            }
            //update restaurant
            useRestaurantStore.getState().addMenuToRestaurant(response.data.menu);
        }catch(error:any){
            console.error(error)
            set({loading:false})
            toast.error(error.response.data.message);
        }
    },
    editMenu:async(menuId:string,formData:FormData)=>{
        try{
            set({loading:true});
            const response= await axios.put(`${API_END_POINT}/${menuId}`,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });
            if(response.data.success){
                set({loading:false,menu:response.data.menu});
                toast.success(response.data.message);
            }
            //update restaurantMenu
            useRestaurantStore.getState().updateMenuToRestaurant(response.data.menu);
        }catch(error:any){
            console.error(error)
            set({loading:false})
            toast.error(error.response.data.message);
        }
    },
    getMenu: async () => {
        try {
            set({ loading: true });
            const response = await axios.get(`${API_END_POINT}/`);
            if (response.data.success) {
                set({ loading: false, menu: response.data.menu });
                toast.success(response.data.message);
            }
        } catch (error: any) {
            if (error.response?.status === 404) {
                set({ menu: null });
            }
            set({ loading: false });
            toast.error(error.response?.data?.message || "Failed to fetch menu");
        }
    },
    
}),{
    name: 'menu-name',
    storage:createJSONStorage(()=>localStorage)
}))