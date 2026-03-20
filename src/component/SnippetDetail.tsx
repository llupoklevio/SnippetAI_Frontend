import {useParams} from "react-router";
import {useGetSnippet, usePostSnippetDescAI} from "../hooks/rectQuery/snippet.ts";
import { DateTime } from "luxon";
import {Editor} from "@monaco-editor/react";
import {useStateDescStoreAI} from "../store/SnippetDescStore.ts";
import {useState} from "react";

export const SnippetDetail = () => {

    const {idSnippet} = useParams()
    const {data: snippet, isLoading, isError , error} = useGetSnippet(Number(idSnippet))
    const {stateDesc,deleteSingleDesc} = useStateDescStoreAI()
    const postDescAI = usePostSnippetDescAI()

    const [loadingDesc, setLoadingDesc] = useState<boolean>(false)

    if(isError && error){


        return (
            <div className="h-screen flex flex-col items-center justify-center">
                <p>{error.message}</p>
                <p>{(error as any).response.data.message}</p>
            </div>
        )
    }

    if(isLoading || !snippet?.snippet){
        return (
            <div className="h-full flex justify-center items-center">
                <span className="loading loading-spinner loading-md"></span>
            </div>
        )
    }

    console.log(snippet,"SNIPPET")


    const GenerateDesc = async (snippetId: number) => {

        try{

            setLoadingDesc(true)

            if(stateDesc![snippetId]){

                await postDescAI.mutateAsync({
                    idSnippet: snippetId,
                    data: stateDesc![snippetId]
                })
            }else{
                alert("No description provided by AI or AI downloading the operation")
            }

            deleteSingleDesc(String(snippetId))

        }catch (e){

            console.error(e)

        }finally {
            setLoadingDesc(false)
        }

    }


    return (

        <div className="h-full m-5 ">
            <div className="p-1">
                <h1 className="text-3xl font-bold">{snippet.snippet.title}</h1>
                <div className="text-sm text-gray-500 mt-1 flex gap-2">
                    <p>ID #{snippet.snippet.id}</p>
                    <p> - </p>
                    <p>Created {DateTime.fromJSDate(new Date(snippet.snippet.dateCreation)).toLocal().toFormat("dd MMM yyyy, HH:mm")}</p>
                    <p> - </p>
                    <p className="text-sm text-gray-500 ">Updated {DateTime.fromJSDate(new Date(snippet.snippet.dateUpdate)).toLocal().toFormat("dd MMM yyyy, HH:mm")}</p>
                </div>
            </div>

            <div className="mt-3 gap-2">

                <div className="">
                    <div className="flex items-center bg-[#0d0d1a] border-t border-l border-r p-3 border-gray-500 rounded-t-2xl mt-1 justify-between">
                        <div className="flex items-center  gap-1">
                            <div className="rounded-4xl bg-red-600 h-3 w-3"></div>
                            <div className="rounded-4xl bg-amber-300 h-3 w-3"></div>
                            <div className="rounded-4xl bg-green-500 h-3 w-3"></div>
                        </div>
                        <p className="text-xs text-gray-500">typescript</p>
                    </div>
                    <Editor
                        className="rounded-b-xl border-b border-l border-r border-gray-500"
                        height="500px"
                        language="typescript"
                        theme="hc-black"
                        value={JSON.parse(`${snippet.snippet.code}`)}
                        options={{
                            readOnly: true,
                            renderValidationDecorations: "off",
                        }}
                    />
                </div>
                <div className="h-fit bg-[#0d0d1a] rounded-xl mt-5 p-2">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl p-2">Description</h1>
                        {stateDesc![snippet.snippet.id] && <h1 onClick={() => GenerateDesc(snippet.snippet.id)} className="text-sm bg-purple-950 rounded-xl hover:bg-purple-800 cursor-pointer p-2">Generate with AI</h1>}
                    </div>
                    <div  className="p-2 ">
                        {!loadingDesc ? snippet.snippet.description :
                            <div className="flex items-center justify-center h-full">
                                <span className="loading loading-spinner loading-md"></span>
                            </div>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}