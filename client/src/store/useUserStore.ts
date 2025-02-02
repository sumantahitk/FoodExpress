import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { LoginInputState, signupInputState } from "@/schema/userSchema";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:8000/api/v1/user";
axios.defaults.withCredentials = true;

type User={
    fullname:string;
    email:string;
    contact:number;
    address:string,
    city:string,
    country:string;
    profilePicture:string,
    admin:boolean;
    isVerified:boolean;
}
type UserState={
    user:User |null,
    isAuthenticated:boolean,
    isCheckingAuth:boolean,
    loading:boolean,
    signup:(input:signupInputState)=>Promise<void>,
    login:(input:LoginInputState)=>Promise<void>,
    verifyEmail:(verificationCode:string)=>Promise<void>
    checkAuthentication:()=>Promise<void>
   logout:()=>Promise<void>
    forgotPassword:(email:string)=>Promise<void>
    resetPassword:(email:string,newPassword:string)=>Promise<void>

    updateProfile:(input:any)=>Promise<void>


}

export const useUserStore = create<UserState>()(persist((set) => ({
    user: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    loading: false,
    //signup api implementation
    signup: async (input: signupInputState) => {
        try {

            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/signup`, input,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );

            if (response.status) {

                console.log(response.data);
                toast.success(response.data.message)
                set({ loading: false, user: response.data.user, isAuthenticated: true });
            }
        }
        catch (error: any) {
            set({ loading: false })
            toast.error(error.response.data.message)
            console.log(error)
        }
    },
    login: async (input: LoginInputState) => {
        try {
            console.log(input)
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/login`, input,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            console.log(response.data.user)
            if (response.status) {

                console.log(response.data);
                toast.success(response.data.message)
                set({ loading: false, user: response.data.user, isAuthenticated: true });
            }
        }
        catch (error: any) {
            set({ loading: false })
            toast.error(error.response.data.message)
            console.log(error)
        }
    },
    verifyEmail: async (verificationCode: string) => {
        try {
            set({ loading: true })
            const response = await axios.post(`${API_END_POINT}/verify-email`, { verificationCode }, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (response.data.success) {
                toast.success(response.data.message); set({ loading: false, user: response.data.user, isAuthenticated: true })
            }
            return response.data;
        } catch (error: any) {
            set({ loading: false })
            console.log(error)
            toast.error(error.response.data.message)

        }
    },
    checkAuthentication:async()=>{
        try{
            set({isCheckingAuth:true})
           const  response = await axios.get(`${API_END_POINT}/check-auth`)
           if(response.data.success){
            toast.success(response.data.message);
            set({user:response.data.user,isAuthenticated:true,isCheckingAuth:false})
           }
        }catch(error:any){
            toast.error(error.response.data.message);
            console.log(error);
            set({isAuthenticated:false,isCheckingAuth:false})
        }
    },
    logout:async()=>{
        try{
            set({loading:true})
            const response = await axios.post(`${API_END_POINT}/logout`);
            if(response.data.success){
                toast.success(response.data.message);
                set({loading:false,user:null,isAuthenticated:false})
            }
        }catch(error:any){
            set({loading:false});
            toast.error(error.response.data.message)
        }
    },
    forgotPassword:async(email:string)=>{
        try{
            set({loading:true})
            const response = await axios.post(`${API_END_POINT}/forgot-password`,{email});
            if(response.data.success){
                toast.success(response.data.message);
                set({loading:false})
            }
        }catch(error:any){
            set({loading:false});
            toast.error(error.response.data.message)
        }
    },
    resetPassword: async (token:string,newPassword:string)=>{
        try{
            set({loading:true})
            const response = await axios.post(`${API_END_POINT}/reset-password/${token}`,{newPassword});
            if(response.data.success){
                toast.success(response.data.message);
                set({loading:false})
            }
        }catch(error:any){
            set({loading:false});
            toast.error(error.response.data.message)
        }
    },
    updateProfile:async(input:any)=>{
        // try{
        //     set({loading:true})
        //     const response = await axios.put(`${API_END_POINT}/profile/update`,{input},{
        //         headers:{
        //             'Content-Type':'application/json'
        //         }
        //     });
        //     if(response.data.success){
        //         toast.success(response.data.message);
        //         set({loading:false,user:response.data.user,isAuthenticated:true})
        //     }
        // }catch(error:any){
        //     set({loading:false});
        //     toast.error(error.response.data.message)
        // }

        try {
           
    
            // Create FormData object
            const formData = new FormData();
    
            // Append fields to FormData
            Object.keys(input).forEach((key) => {
                // if (input[key] instanceof File) {
                //     console.log(`${key}: File exists`);
                // } else {
                //     console.log(`${key}: No file`);
                // }
                formData.append(key, input[key]);
            });
    
            // Make the API call
            const response = await axios.put(`${API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.data.success) {
                toast.success(response.data.message);
                set({ user: response.data.user, isAuthenticated: true });
            }
        } catch (error: any) {
          
            toast.error(error.response?.data?.message || 'Failed to update profile');
            console.error(error);
        }
        
        
    }

}), {
    name: 'user-name',
    storage: createJSONStorage(() => localStorage),

}))