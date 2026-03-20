import API from "./index.ts"
import type {
    typeCreateSnippetValidator,
    typeResponseAPIGETSnippets,
    typeResponseControllerSnippet, typeValidatorQuerySearch
} from "../type/snippet.ts";

export const getSnippets = {
    name: 'getSnippets.Snippet',
    fn : async() => {
        const response = await API.get<typeResponseAPIGETSnippets>('/snippets');
        return response.data ;
    }
}

export const postSnippet = {
    name: 'postSnippet.Snippet',
    fn : async(data : typeCreateSnippetValidator) => {
        const dataToSend = {...data, code: JSON.stringify(data.code)}
        const response = await API.post<typeResponseControllerSnippet>('/snippets', dataToSend);
        return response.data ;
    }
}

export const postSnippetDescAI = {
    name: 'postSnippetDescAI.Snippet',
    fn: async({data, idSnippet} : {data: string, idSnippet: number}) => {
        const response = await API.post(`/snippets/${idSnippet}/saveDescAI`, { description: data });
        return response.data ;
    }
}

export const getSnippet = {
    name: 'getSnippet.Snippet',
    fn: async (idSnippet: number) => {
        const response = await API.get<typeResponseControllerSnippet>(`/snippets/${idSnippet}`);
        return response.data ;
    }
}


export const postQueryForSnippets = {
    name: 'postQueryForSnippets.Snippet',
    fn: async (data: typeValidatorQuerySearch) => {
        const response = await API.post(`/snippets/SimilaritySearch`, data);
        return response.data ;
    }
}