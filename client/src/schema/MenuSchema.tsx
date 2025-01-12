import {z} from "Zod";

export const MenuSchema=z.object({
    name:z.string().nonempty({message:"Name is required  "}),
    description:z.string().nonempty({message:"Description is required  "}),
    price:z.number().min(0,{message:"Price can not be negative"}),
   imagemenu:z.instanceof(File).optional().refine((file)=>file?.size!==0,{message:"Image is required"})

});

export type MenuFromSchema=z.infer<typeof MenuSchema>;