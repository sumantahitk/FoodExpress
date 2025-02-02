import { CheckoutSessionRequest, OrderState } from "@/type/orderType";
import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import  axios  from "axios";

const API_END_POINT: string = "http://localhost:8000/api/v1/order";
axios.defaults.withCredentials=true;

export const useOrderStore=create<OrderState>()(persist((set)=>({
    loading:false,
    orders:[],
    createCheckOutSession:async (checkoutSession:CheckoutSessionRequest)=>{
        try{
            set({loading:true});
            const response=await axios.post(`${API_END_POINT}/checkout/create-checkout-session`,checkoutSession,
                {
                    headers:{
                        'Content-Type':'application/json'
                    }
                }
            );
           const session =response.data.session;
           window.location.href=session.url;
           set({loading:false});

        }catch(error){
            set({loading:false});
            console.log(error);

        }
    },
    // getOrderDetails:async()=>{
    //     try{
    //         set({loading:true});
    //             const response=await axios.get(`${API_END_POINT}/`);
    //             console.log(response.data.orders);
    //         set({loading:false, orders:response.data.orders})

    //     }catch(error){
    //         set({loading:false})
    //         console.log(error);
    //     }
    // }
    getOrderDetails: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/`);
        //   console.log("Fetched orders:", response.data.order);
          set({ orders: response.data.order || [], loading: false });
        } catch (error) {
          console.error("Failed to fetch orders:", error);
          set({ orders: [], loading: false });
        }
      },

})
,{
    name:'order-name',
    storage:createJSONStorage(()=>localStorage)
}))