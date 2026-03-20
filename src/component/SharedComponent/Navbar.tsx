import {useAuthStore} from "../../store/authStore.ts";

export const Navbar = () => {

    const {logout} = useAuthStore()

    return (
        <>
            <div className="navbar bg-[#0d0d1a] h-20 shadow-sm border-b border-b-gray-800">
                <div className="flex-1">
                    <h1 className="px-2 font-syne text-amber-50 text-4xl">Snippet<span className="text-green-500">AI</span></h1>
                </div>
                <div className="flex-none">

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="mr-2 btn btn-ghost btn-circle avatar">
                            <div className="w-10  rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={-1}
                            className=" menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a>Profile</a></li>
                            <li><a>Settings</a></li>
                            <li onClick={() => logout()}><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}