import plusBlack from "@src/assets/plusBlack.svg";
import play from "@src/assets/play.svg";
import insertSnippet from "@src/assets/insertSnippet.svg";

import {useGetSnippets, usePostSnippetDescAI} from "../hooks/rectQuery/snippet.ts";
import {useNavigate} from "react-router";
import {useStateDescStoreAI} from "../store/SnippetDescStore.ts";

export const Snippets = () => {

   const {data : snippets , isLoading: loadingSnippets, isError, error} = useGetSnippets()
   const navigate = useNavigate()
   const postDescAI = usePostSnippetDescAI()
    const {stateDesc,deleteSingleDesc} = useStateDescStoreAI()


    console.log("snippets data:", snippets)

    const saveAI = async (snippetId: number) => {
        try{


            if(stateDesc![snippetId]){

                await postDescAI.mutateAsync({
                    idSnippet: snippetId,
                    data: stateDesc![snippetId]
                })
            }else{
                alert("No description provided by AI")
            }

            deleteSingleDesc(String(snippetId))

        }catch (e){

            console.error(e)
        }
    }

    if(loadingSnippets){

        return (
            <div className="flex h-full justify-center items-center ">
                <span className="loading loading-spinner loading-md"></span>
            </div>
        )
    }

    if(isError && error){
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <p>{error?.message}</p>
            </div>
        )
    }

    return (
        <>
        {snippets?.snippets && snippets?.snippets.length  > 0  ? <div >
                <div className="flex justify-between items-center px-6 mt-2">
                    <h1 className=" text-3xl">My Snippets</h1>
                    <button onClick={() => navigate("/home/addSnippet")} className="rounded-xl btn btn-success">
                        <img src={plusBlack} alt="plus logo"  height="25px" width="25px"></img>
                        <span  className="font-syne">New Snippet</span>
                    </button>
                </div>

                <div className="bg-[#0d0d1a] rounded-md mt-3 p-2 w-full mx-5">FILTRI....</div>

                <h1 className="text-gray-500 m-5 " >{"Results".toUpperCase()}</h1>

                <div className="px-6 mt-3 flex-col flex gap-2 items-start">{snippets?.snippets.map(snippet => (
                    <div style={{width: "100%"}} onClick={() => navigate(`/home/snippet/${snippet.id}`)} className="transition-colors duration-100 cursor-pointer hover:bg-blue-950 bg-[#0d0d1a] rounded-md border border-gray-800 flex h-16" key={snippet.id}>

                        <div className="self-center m-5 p-2 shrink-0 rounded-md h-10 w-10 border bg-blue-950 border-black text-blue-500">TS</div>

                        <div style={{width: "85%"}} className="shrink-0 flex flex-col gap-2 justify-center p-2">
                            <span className="text-md font-bold font-syne h-1/2 shrink-0 w-10/12 truncate text-ellipsis whitespace-nowrap">{snippet.title}</span>
                            <span className="text-xs  font-syne h-1/2 w-10/12 shrink-0 overflow-hidden text-ellipsis whitespace-nowrap">{snippet.description}</span>
                        </div>
                        <div style={{width: "15%"}} className=" flex items-center flex-col p-1">
                            <span className="text-xs  flex items-center h-1/2">{new Date(snippet.dateCreation).toLocaleDateString()}</span>
                            {!snippet.description && stateDesc?.[String(snippet.id)] && <span onClick={(e) => {
                                e.stopPropagation();  void saveAI(snippet.id)
                            }} className="h-1/2 gap-1 flex rounded-md justify-center items-center p-1 bg-purple-950"><img src={play} height={15} width={15} alt="play logo"/><span className="text-xs  text-purple-300 ">
                               AI desc
                            </span></span>}
                        </div>


                    </div>
                ))}</div>

            </div> :
            <div className="h-full flex flex-col justify-center items-center ">
                <div className=" w-5/12 p-5 text-center flex flex-col gap-3">
                    <div className="flex justify-center">
                        <img src={insertSnippet} height={100} width={100} alt="snippet insert logo"/>
                    </div>
                    <h1 className="text-3xl mt-2">No snippets yet</h1>
                    <div className="text-gray-500">
                        <p className="text-sm mt-2">Save your first code snippet and let AI generate a semantic</p>
                        <p className="text-sm">description so you can find it instantly later.</p>
                    </div>

                    <button onClick={() => navigate("/home/addSnippet")} className="rounded-xl mt-3 w-full btn btn-success">
                        <span className="font-syne">Create First Snippet</span>
                    </button>

                    <hr className="mt-5 " />

                    <p className="text-xs text-gray-500 mt-5">{"How it works".toUpperCase()}</p>

                    <div className="mt-2 text-left flex flex-col gap-3 text-gray-500">
                        <p><span className="text-white">Save a snippet</span> — paste your code with optional description</p>
                        <p><span className="text-white">AI generates description </span> — GPT-4.1 via LangChain indexes it in the vector DB</p>
                        <p><span className="text-white">Search semantically</span> — find any snippet describing what it does, not just the title</p>
                    </div>
                </div>

            </div>
        }
        </>
    )
}