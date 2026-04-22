// fetch data from axios
import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "https://fakestoreapiserver.reactbd.org/api",
    headers:{
        "Content-Type" : "application/json",
    },
})

export default axiosInstance