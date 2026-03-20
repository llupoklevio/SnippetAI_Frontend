import {useGetSnippets, usePostQuerySnippetSearch} from "../hooks/rectQuery/snippet.ts";
import search from "@src/assets/search.svg";
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import {
    type IResponseSnippets,
    type typeValidatorQuerySearch,
    validatorQuerySearch
} from "../type/snippet.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMemo, useState} from "react";


export const AISearch = () => {

    const {data, isLoading, isError, error} = useGetSnippets()
    const navigate = useNavigate()
    const searchSnipet = usePostQuerySnippetSearch()
    const [snippets, setSnippets] = useState<{snippets: IResponseSnippets[]}>({snippets: []})

    const {register, handleSubmit, formState: {errors},/* setError, clearErrors */} = useForm<typeValidatorQuerySearch>({
        resolver: zodResolver(validatorQuerySearch),
        mode: 'onSubmit',
    })

    const snippetsFilteredByAI = useMemo(() => {
        if(snippets.snippets.length === 0) {
            console.log(data?.snippets,"usememo")
            return data?.snippets ?? []
        }else{
            console.log(snippets.snippets,"usememo snippets")
            return (snippets.snippets as any).snippets
        }
    },[data,snippets])

    if(isError && error){
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center">
                <p>{error?.message}</p>
                <p>{(error as any).response.data.message}</p>
            </div>
        )
    }

    if(isLoading){
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <span className="loading loading-spinner loading-md"></span>
            </div>
        )
    }

    const onSubmit = async (data : typeValidatorQuerySearch) => {

        console.log(data, "AI Search")

        try{

            const results: IResponseSnippets[] =  await searchSnipet.mutateAsync(data)
            console.log(results,"res snippets search successfully.")
            setSnippets({
                snippets: results
            })

        }catch(error : any){

            console.log(error, error.response)
            setSnippets({
                snippets: []
            })
            alert(error.response?.data?.message,error)
        }

    }


    const isEmpty = (query : string) => {
        if(!query)
            setSnippets({
                snippets: []
            })
    }

    return (
        <div>
            { snippetsFilteredByAI && Array(snippetsFilteredByAI) && snippetsFilteredByAI.length > 0 &&
                <>
                    <div className="p-2 flex flex-col items-center justify-start gap-2">
                        <div className="mt-5 bg-purple-950 border border-purple-600 p-2 rounded-2xl" >
                            <img src={search} height={50} width={50} alt="search"/>
                        </div>

                        <div>
                            <p className="font-syne font-bold text-4xl">Semantic <span className="text-purple-600">AI</span> Search</p>
                        </div>

                        <p className="text-gray-500">Describe what you need in natural language. Vector similarity finds the best matching snippets.</p>

                        <div className="w-full ">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex gap-2 p-2 items-start w-full ">
                                    <div className=" w-full">
                                        <input {...register("query")}
                                            onChange={(e) => isEmpty(e.target.value)}
                                        type="text"
                                        placeholder="Try: 'how to validate JWT' or 'docker build optimization' "
                                        className="w-full wrap-break-word text-wrap rounded-xl border border-gray-500 input bg-[#0D0D2E]"/>
                                        {errors.query ? <p className="text-red-500 mt-2 ml-1">{errors.query?.message as string}</p> : <p className="mt-2 invisible">Empty space</p>}
                                    </div>
                                    <button type="submit" className="btn btn-success rounded-2xl">Search Snippet</button>
                                </div>
                            </form>
                        </div>
                    </div>


                    <div className="ml-5">
                        <p className="text-gray-500">{"Results".toUpperCase()} : {snippetsFilteredByAI.length} matches</p>

                        <div className="mt-2">
                            {snippetsFilteredByAI.map((snippet) => (
                                <div key={snippet.id}>
                                    <div style={{width: "99%"}} onClick={() => navigate(`/home/snippet/${snippet.id}`)} className="transition-colors duration-100 cursor-pointer hover:bg-blue-950 bg-[#0d0d1a] rounded-md border border-gray-800 flex h-16" key={snippet.id}>

                                        <div className="self-center m-5 p-2 shrink-0 rounded-md h-10 w-10 border bg-blue-950 border-black text-blue-500">TS</div>

                                        <div style={{width: "85%"}} className="shrink-0 flex flex-col gap-2 justify-center p-2">
                                            <span className="text-md font-bold font-syne h-1/2 shrink-0 w-10/12 truncate text-ellipsis whitespace-nowrap">{snippet.title}</span>
                                            <span className="text-xs  font-syne h-1/2 w-10/12 shrink-0 overflow-hidden text-ellipsis whitespace-nowrap">{snippet.description}</span>
                                        </div>
                                        <div style={{width: "15%"}} className=" flex items-center flex-col p-1">
                                            <span className="text-xs  flex items-center h-1/2">{new Date(snippet.dateCreation).toLocaleDateString()}</span>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            }


            {
                snippetsFilteredByAI && Array(snippetsFilteredByAI) && snippetsFilteredByAI.length === 0 && (
                    <div className="h-screen  p-2 flex flex-col items-center justify-center gap-8">
                        <div className="mt-5 bg-purple-950 border border-purple-600 p-2 rounded-2xl" >
                            <img src={search} height={50} width={50} alt="search"/>
                        </div>

                        <div>
                            <p className="font-syne font-bold text-4xl">Semantic <span className="text-purple-600">AI</span> Search</p>
                        </div>

                        <p className="text-gray-500">Describe what you need in natural language. Vector similarity finds the best matching snippets.</p>

                        <div className=" w-5/12 px-5 text-center flex flex-col gap-2">
                            <div className="text-gray-500">
                                <p className="text-sm mt-2">Save your first code snippet and let AI generate a semantic</p>
                                <p className="text-sm">description so you can find it instantly later.</p>
                            </div>

                            <button onClick={() => navigate("/home/addSnippet")} className="rounded-xl mt-3 w-full btn btn-success">
                                <span className="font-syne">Create First Snippet</span>
                            </button>

                            <hr className="mt-5 " />

                            <p className="text-xs text-gray-500 mt-5">{"How it works".toUpperCase()}</p>

                            <div className="mt-2 text-center flex flex-col gap-3 text-gray-500">
                                <p> AI Search works on snippets that have an AI-generated description indexed in the vector DB.</p>
                            </div>
                        </div>

                    </div>
                )
            }

        </div>
    )
}