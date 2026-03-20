import {useMutation} from "@tanstack/react-query";
import {postLogin, postRegister} from "../../networking/auth.ts";
import type {loginSend, registerSend} from "../../type/authValidator.ts";


export const useAuthRegister = () => {

    return useMutation({
        mutationKey: [postRegister.name],
        mutationFn: (data : registerSend) => postRegister.fn(data)
    })

}

export const useAuthLogin = () => {

    return useMutation({
        mutationKey: [postLogin.name],
        mutationFn: (data: loginSend) => postLogin.fn(data)
    })
}