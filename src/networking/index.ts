import axios from "axios";
import {useAuthStore} from "../store/authStore.ts";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});


instance.interceptors.request.use(
    (config) => {
        const session = useAuthStore.getState().session
        if(session?.accessToken){
            config.headers['Authorization'] = `Bearer ${session?.accessToken}`
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
)

export default instance;