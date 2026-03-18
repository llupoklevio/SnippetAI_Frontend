import API from "./index.ts"
import type {registerSend} from "../type/authValidator.ts";

export const postRegister =  {
    name: "postRegister.Auth",
    fn: async (data: registerSend) => {
        const response = await API.post("auth/register", data)
        return response.data
    }
}