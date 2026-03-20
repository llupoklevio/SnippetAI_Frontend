import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {
    type loginSend,
    loginValidator, type typeRegisterDTO,
    type typeResponseLoginAPI,
} from "../type/authValidator.ts";
import {useAuthStore} from "../store/authStore.ts";
import {useAuthLogin} from "../hooks/rectQuery/auth.ts";
import {AxiosError} from "axios";
import {useState} from "react";
import {useNavigate} from "react-router";

export const Login = () => {

    const {session, setSession} = useAuthStore()
    const navigate = useNavigate();

    const mutationLogin = useAuthLogin()

    const {register, handleSubmit, formState: {errors}, /* setError, clearErrors */} = useForm<loginSend>({
        resolver: zodResolver(loginValidator),
        mode: 'onSubmit',
        defaultValues: {
            email: session?.user.email
        }
    })

    const [loading, setLoading] = useState(false)
    const [openDialogError,setOpenDialogError] = useState<boolean>(false)
    const [dialogErrorTitleText, setDialogErrorTitleText] = useState<string>()
    const [dialogErrorText, setDialogErrorText] = useState<string>()

    const onSubmit = async (data: loginSend) => {

        setLoading(true)

        try{

            const responseRegister : typeResponseLoginAPI = await mutationLogin.mutateAsync(data)
            setSession({
                accessToken: responseRegister.session.accessToken,
                refreshToken: responseRegister.session.refreshToken,
                user: {...session?.user ?? responseRegister.session.user} as typeRegisterDTO
            })

            alert("success")

            navigate("/home/snippets")

        }catch(error){

            if(error instanceof AxiosError){

                const errorTitleText = error.message
                let errorText

                switch (Number(error.response?.status)) {

                    case 400:
                        errorText = error.response?.data.error
                        break

                    default:
                        errorText =
                            error.response?.data.message ||
                            error.response?.data.errors ||
                            error.response?.data.error ||
                            error.response?.data
                        break
                }


                console.error(error.response)

                setDialogErrorTitleText(errorTitleText)
                setDialogErrorText(errorText)
                setOpenDialogError(true)
            }

            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-1">
                    <h1 className="text-gray-500 mt-2">{"email".toUpperCase()}</h1>
                    <input {...register("email")}
                           type="email"
                           placeholder="Email"
                           className="w-full p-2 mt-2 rounded-xl border border-gray-500 input bg-[#0D0D2E]" />
                    {errors.email && <p className="text-red-500 text-sm p-1">{errors?.email?.message as string}</p>}
                </div>

                <div className="flex-1">
                    <h1 className="text-gray-500 mt-2">{"password".toUpperCase()}</h1>
                    <input {...register("password")}
                           type="password"
                           placeholder="Password"
                           className="w-full p-2 mt-2 rounded-xl border border-gray-500 input bg-[#0D0D2E]" />
                    {errors.password && <p className="text-red-500 text-sm p-1">{errors?.password?.message as string}</p>}
                </div>

                <button className="mt-5 p-2 transition-colors duration-200 cursor-pointer active:bg-green-300 bg-green-400 w-full rounded-xl ">{loading ? <span className="loading loading-spinner loading-md"></span> :  "Sign In" }</button>
            </form>

            <dialog id="my_modal_2" className="modal " open={openDialogError} onClose={() => setOpenDialogError(false)}>
                <div className="modal-box min-h-1/8 w-6/12 mx-auto bg-error-content">
                    <h3 className="font-bold text-lg">{dialogErrorTitleText}</h3>
                    <p className="py-4">{dialogErrorText}</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}