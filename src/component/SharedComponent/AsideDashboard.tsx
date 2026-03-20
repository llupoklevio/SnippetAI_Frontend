import squadSvg from "@src/assets/squad.svg"
import squadSvgPurple from "@src/assets/squadPurple.svg"
import plus from "@src/assets/plus.svg"

import {useLocation, useNavigate} from "react-router";

export const AsideDashboard = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const isMySnippet = location.pathname === "/home/snippets"
    const isSearchAI = location.pathname === "/home/AISearch"
    const isAddSnippet = location.pathname === "/home/addSnippet"

    return (
        <div className="navbar flex flex-col gap-1.25 bg-[#0d0d1a] min-h-screen pb-10 w-3/12">

            <div onClick={() => navigate("/home/snippets")} className="mt-2 cursor-pointer w-11/12">
                <div className={`group transition-colors duration-200 border-0 hover:bg-green-950 p-3 rounded-md   ${isMySnippet ? "bg-green-950" : "bg-[#0d0d1a] "} flex justify-between`}>
                    <div className="flex items-center w-10/12 gap-2 " >
                        <img src={squadSvg} className="w-6 h-6" alt="squad logo"/>
                        <span className={`${isMySnippet ? "text-[#4ade80]" : "text-gray-500"} font-bold group-hover:text-[#4ade80]`}>My Snippet</span>
                    </div>
                    <div></div>
                </div>
            </div>

            <div onClick={() => navigate("/home/AISearch")} className=" cursor-pointer w-11/12">
                <div className={`group transition-colors duration-200 border-0 hover:bg-purple-900 p-3 rounded-md  ${isSearchAI ? "bg-purple-900" : "bg-[#0d0d1a] "} flex justify-between`}>
                    <div className="flex items-center w-10/12 gap-2 " >
                        <img src={squadSvgPurple} className="w-6 h-6" alt="squad logo"/>
                        <span className={`${isSearchAI ? "text-purple-500" : "text-gray-500"} font-bold group-hover:text-purple-500 `}>AI Search</span>
                    </div>
                    <div className={`group-hover:text-white mt-auto ${isSearchAI ? "text-white" : "text-gray-500"}`}>RAG</div>
                </div>
            </div>

            <div className="w-11/12 mt-2">
                <h1 className="text-sm text-gray-500">{"Actions".toUpperCase()}</h1>
            </div>


            <div onClick={() => navigate("/home/addSnippet")} className="mt-2 cursor-pointer w-11/12">
                <div className={`group transition-colors duration-200 border-0 hover:bg-green-950 p-3 rounded-md ${isAddSnippet ? "bg-green-950" : "bg-[#0d0d1a] "} flex justify-between`}>
                    <div className="flex items-center w-10/12 gap-2 " >
                        <img src={plus} className="w-6 h-6" alt="plus logo"/>
                        <span className={`${isAddSnippet ? "text-[#4ade80]" : "text-gray-500"} font-bold group-hover:text-[#4ade80]`}>New Snippet</span>
                    </div>
                    <div></div>
                </div>
            </div>


        </div>
    )
}