import {Outlet, useLocation, useNavigate} from "react-router"

export const Auth = () => {

    const location = useLocation()
    let navigate = useNavigate();

    const pathLocation = location.pathname


    const styleAuthSelected = 'bg-[#060647] text-white rounded-xl border border-gray-600'
    const styleAuthNotSelected = 'text-white rounded-xl '

    return (
        <>
            <div className="bg-[#07070f] w-screen min-h-screen pb-20" >
                <div className=" h-28 flex justify-center items-center">
                    <h1 className="font-syne text-amber-50 text-4xl">Snippet<span className="text-green-500">AI</span></h1>
                </div>

                <div className="flex justify-center items-center flex-col">
                    <div className="card relative pb-8 text-amber-50 border border-gray-600 rounded-2xl bg-[#0d0d1a] min-h-48 w-4/12">
                        <div className="items-center p-5">
                            <h2 className="text-3xl card-title">{pathLocation === '/register'? 'Welcome' : 'Welcome back' }</h2>
                            <p className="text-sm text-gray-500">Sign in to your intelligent snippet library</p>
                            <div className="p-1 my-5 flex justify-between rounded-xl border border-gray-600 bg-[#0D0D2E]">

                                <div  onClick={() => navigate("/login")} className={`cursor-pointer p-2 w-1/2 text-center ${pathLocation === '/login' ?  styleAuthSelected : styleAuthNotSelected }`}>
                                    <h1 className={`${pathLocation === '/login' ? 'text-amber-50' :'text-gray-600' }`}>Login</h1>
                                </div>

                                <div  onClick={() => navigate("/register")}  className={`cursor-pointer p-2 w-1/2 text-center ${pathLocation === '/register' ?  styleAuthSelected : styleAuthNotSelected }`}>
                                    <h1 className={`${pathLocation === '/register' ? 'text-amber-50' :'text-gray-600' }`}>Register</h1>
                                </div>

                            </div>
                            <Outlet />
                        </div>
                        <p className="p-3.5 absolute left-0 right-0 text-center bottom-0 text-sm text-gray-500 "> Access token expires in 5 min · Refresh handled automatically</p>

                    </div>

                </div>

            </div>
        </>
    )
}