import {useMutation} from "@tanstack/react-query";
import {postRegister} from "../../networking/auth.ts";
import type {registerSend} from "../../type/authValidator.ts";


export const useAuthRegister = () => {

    return useMutation({
        mutationKey: [postRegister.name],
        mutationFn: (data : registerSend) => postRegister.fn(data)
    })

}