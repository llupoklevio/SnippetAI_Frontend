import API from "./index.ts"
import type {loginSend, registerSend} from "../type/authValidator.ts";

export const postRegister =  {
    name: "postRegister.Auth",
    fn: async (data: registerSend) => {
        const response = await API.post("auth/register", data)
        return response.data
    }
}

export const postLogin =  {
    name: "postLogin.Auth",
    fn: async(data: loginSend) => {
        const response = await API.post("auth/login", data)
        return response.data
    }
}