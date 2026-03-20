import leftArrow from "@src/assets/leftArrow.svg";
import {Controller, useForm} from "react-hook-form";
import {
    createSnippetValidator,
    type typeCreateSnippetValidator,
    type typeResponseControllerSnippet
} from "../type/snippet.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Editor} from "@monaco-editor/react";
import TextareaAutosize from 'react-textarea-autosize';
import {useNavigate} from "react-router";
import {usePostSnippet} from "../hooks/rectQuery/snippet.ts";
import {getSocketSnippet} from "../socket/socket.ts";
import {useStateDescStoreAI} from "../store/SnippetDescStore.ts";



export const AddSnippet = () => {


    const {register, handleSubmit, formState: {errors},control, reset,/* setError, clearErrors */} = useForm<typeCreateSnippetValidator>({
        resolver: zodResolver(createSnippetValidator),
        mode: 'onSubmit',
        defaultValues:{
            code: "",
            title: "",
            description:""
        }
    })
    const postSnippet = usePostSnippet()
    const navigate = useNavigate();
    let socketSnippet = getSocketSnippet()
    const {setStateDesc,stateDesc} = useStateDescStoreAI()

    console.log(stateDesc,"STORE SNIPPETS")

    const onSubmit = async (data : typeCreateSnippetValidator) => {

        try{

          const response : typeResponseControllerSnippet = await postSnippet.mutateAsync(data)

            if(response.message === "DESCRIPTIONAI") {

                socketSnippet.on("connect", () => {
                    console.log("socket connesso!");
                    socketSnippet.emit("join", response.snippet.id);
                });

                socketSnippet.connect()

                socketSnippet.on("description:completed", (data: {description: string, snippetId: number}) => {
                    console.log(data, "socket");
                    setStateDesc({
                        snippetId: String(data.snippetId),
                        description: data.description
                    })
                    socketSnippet.disconnect();
                })

            }

            console.log(response,"response")
            navigate("/home")
        }catch (error){

            alert(error.response.data.message)

        }

        console.log(data)
    }

    return (
        <>
            <div className=" m-5 h-full">

                <div className=" bg-black p-2 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl">New Snippet</h1>
                        <p className="text-sm mt-1 text-gray-500" >Paste your code and optionally add a description for AI indexing</p>
                    </div>
                    <button onClick={() => navigate("/home")} className="rounded-xl bg-[#0d0d1a] btn ">
                        <img src={leftArrow}  height="15px" width="15px" alt="left arrow"></img>
                        <span className="font-syne">Back</span>
                    </button>
                </div>

                <div className="bg-black mt-1 p-1">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <h1 className="text-gray-500 mt-2">{"title".toUpperCase()} (required)</h1>
                            <input {...register("title")}
                                   type="text"
                                   placeholder="e.g. JWT Middleware Express"
                                   className="w-full p-2 mt-2 rounded-xl border border-gray-500 input bg-[#0D0D2E]" />
                            {errors.title && <p className="text-red-500 text-sm p-1">{errors?.title?.message as string}</p>}
                        </div>

                        <div className="mt-3 h-fit">
                            <h1 className="text-gray-500 mt-2">{"code".toUpperCase()} (required)</h1>
                            <div className="flex items-center bg-[#0d0d1a] border-t border-l border-r p-3 border-gray-500 rounded-t-2xl mt-1 justify-between">
                                <div className="flex items-center  gap-1">
                                    <div className="rounded-4xl bg-red-600 h-3 w-3"></div>
                                    <div className="rounded-4xl bg-amber-300 h-3 w-3"></div>
                                    <div className="rounded-4xl bg-green-500 h-3 w-3"></div>
                                </div>
                                <p className="text-xs text-gray-500">typescript</p>
                            </div>
                            <Controller
                                name="code"
                                control={control}
                                render={({ field }) => (
                                    <Editor
                                        height="350px"
                                        language="typescript"
                                        theme="hc-black"
                                        value={field.value}
                                        onChange={field.onChange}
                                        className="rounded-b-xl border-b border-l border-r border-gray-500"
                                        options={{
                                            renderValidationDecorations: "off",
                                        }}
                                    />
                                )}
                            />
                            {errors.code && <p className="text-red-500 text-sm p-1">{errors?.code?.message as string}</p>}
                        </div>

                        <div >
                            <div className="">
                                <h1 className="text-gray-500 h-full mt-2">{"description".toUpperCase()}</h1>
                                <TextareaAutosize
                                    {...register("description")}
                                    placeholder="Describe what code does, its purpose and usage context ..."

                                    className="w-full p-2 mt-2 rounded-xl border border-gray-500 bg-[#0D0D2E] resize-none"
                                    minRows={4}
                                />
                                {errors.description && <p className="text-red-500 text-sm p-1">{errors?.description?.message as string}</p>}
                            </div>
                        </div>

                        <div role="alert" className="alert alert-info mt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>If you skip the description, AI will generate one automatically. You can review and save it from the detail view.</span>
                        </div>

                        <div className="flex gap-2 mt-3">
                            <button type="submit" className="btn btn-success">Save Snippet</button>
                            <button type="button" onClick={() => reset({
                                code: "",
                                title: "",
                                description: ""
                            })} className="btn btn-soft">Cancel</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}