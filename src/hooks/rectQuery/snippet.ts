import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    getSnippet,
    getSnippets,
    postQueryForSnippets,
    postSnippet,
    postSnippetDescAI
} from "../../networking/snippet.ts";
import type {typeCreateSnippetValidator, typeValidatorQuerySearch} from "../../type/snippet.ts";

export const useGetSnippets = () => {

    return useQuery({
        queryKey: [getSnippets.name],
        queryFn: () => getSnippets.fn(),

    })
}

export const usePostSnippet = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [postSnippet.name],
        mutationFn: (data: typeCreateSnippetValidator) => postSnippet.fn(data),
        onSuccess: () => queryClient.invalidateQueries({queryKey: [getSnippets.name]})
    })
}


export const useGetSnippet = (idSnippet: number) => {

    return useQuery({
        queryKey: [getSnippet.name,idSnippet],
        queryFn: () => getSnippet.fn(idSnippet),
        enabled: !!idSnippet,
    })
}


export const usePostSnippetDescAI = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [postSnippetDescAI.name],
        mutationFn: (data: {data: string, idSnippet: number}) => postSnippetDescAI.fn(data),
        onSuccess: () => {
            return Promise.all([
                queryClient.invalidateQueries({queryKey: [getSnippets.name]}),
                queryClient.invalidateQueries({queryKey: [getSnippet.name]})
            ])
        }
    })
}


export const usePostQuerySnippetSearch = () => {

    return useMutation({
        mutationKey: [postQueryForSnippets.name],
        mutationFn: async (data: typeValidatorQuerySearch) => postQueryForSnippets.fn(data),
    })
}

