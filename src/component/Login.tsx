import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {loginValidator} from "../type/authValidator.ts";
import {useAuthStore} from "../store/authStore.ts";

export const Login = () => {

    const {session} = useAuthStore()

    const {register, handleSubmit, formState: {errors}, /* setError, clearErrors */} = useForm<any>({
        resolver: zodResolver(loginValidator),
        mode: 'onSubmit',
        defaultValues: {
            email: session?.user.email
        }
    })

    const onSubmit = (e : Event) => {
        console.log(e)
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

                <button className="mt-5 p-2 transition-colors duration-200 cursor-pointer active:bg-green-300 bg-green-400 w-full rounded-xl ">Sign In</button>
            </form>

        </>
    )
}