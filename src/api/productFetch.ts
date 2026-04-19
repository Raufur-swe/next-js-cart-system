// fetching products

import axiosInstance from "../lib/axios";
export const getProductes = async()=>{

    try {
        const res = await axiosInstance.get("/products")
       console.log('products responce : ' , res.data)
       return res.data;
       
    } catch (error) {
        console.error("faild to fetch data : " , error);
        
        throw error // for handaling error in parent components
    }
}

