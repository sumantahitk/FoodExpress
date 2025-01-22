import axios from "axios";
import { toast } from "sonner";
import {create} from "zustand" ;
import {createJSONStorage, persist} from "zustand/middleware";



// type RestaurantState ={
//     loading:boolean,
//     restaurant:null,
//     restaurantResult:null,
// }

const API_END_POINT="http://localhost:8000/api/v1/restaurant";
axios.defaults.withCredentials=true;
export const useRestaurantStore=create()(persist((set)=>({
    loading:false,
    restuarant:null,
    searchRestaurant:null,
    createRetuarant: async(formData:FormData)=>{
        try{
            set({loading:true});
            const response= await axios.post(`${API_END_POINT}`,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            if(response.data.success){
                set({loading:false});
                toast.success(response.data.message);
            }
        }catch(err :any){
            set({loading:false});
            toast.success(err.response.data.message);
        }
    },
    getRetuarant: async()=>{
        try{
            set({loading:true});
            const response= await axios.get(`${API_END_POINT}/`)
            if(response.data.success){
                set({loading:false,restaurant:response.data.restaurant});
                toast.success(response.data.message);
            }
            return 
        }catch(err :any){
            if(err.response.status===404){
                set({restaurant:null});
            }
            set({loading:false});
            toast.success(err.response.data.message);
        }
    },
    updateRetuarant: async(formData:FormData)=>{
        try{
            set({loading:true});
            const response= await axios.put(`${API_END_POINT}/`,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            if(response.data.success){
                set({loading:false});
                toast.success(response.data.message);
            }
        }catch(err :any){
            set({loading:false});
            toast.success(err.response.data.message);
        }
    },
    searchRetuarant: async(searchText,searchQuery,selectedCuisines)=>{
        try{
            set({loading:true});
            const params = new URLSearchParams();
            params.set("searchQuery",searchQuery);
            params.set("selectedCuisines",selectedCuisines);

            const response= await axios.get(`${API_END_POINT}/search/${searchText}?searchQuery=${searchQuery}?${params.toString()}`,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            if(response.data.success){
                set({loading:false,searchedRestaurant:response.data});
                toast.success(response.data.message);
            }
        }catch(err :any){
            set({loading:false});
            toast.success(err.response.data.message);
        }
    }

}),{
    name:'restauurant-name',
    storage:createJSONStorage(()=>localStorage)
}))