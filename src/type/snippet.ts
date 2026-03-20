/** GET SNIPPETS */
import {z} from "zod";

export const ResponseGetSnippets = z.array(z.object({
    id: z.number(),
    title: z.string(),
    code: z.string(),
    description: z.string().nullable(),
    dateCreation: z.date(),
    dateUpdate: z.date(),
    snippetOwner: z.object({
        id: z.string(),
        email: z.string(),
    })
}))

export type IResponseSnippets = z.infer<typeof ResponseGetSnippets>;

export const ResponseAPIGETSnippets = z.object({
    snippets: ResponseGetSnippets
})

export type typeResponseAPIGETSnippets = z.infer<typeof ResponseAPIGETSnippets>;


/** POST SNIPPET */

export const createSnippetValidator = z.object({
    title:
        z.string()
            .trim()
            .min(1,"Title is required"),

    code:
        z.string()
            .min(1,"Code is required"),

    description: z.string()
        .trim()
        .refine(val => val === "" || val.length >= 20, {
            message: "Description must be a minimum of 20 characters"
        })
        .transform(val => val === "" ? undefined : val)
        .optional()
})

export type typeCreateSnippetValidator = z.infer<typeof createSnippetValidator>


export const ResponsePostSnippet = z.object({
    id: z.number(),
    title: z.string(),
    code: z.string(),
    description: z.string().nullable(),
    dateCreation: z.date(),
    dateUpdate: z.date(),
    snippetOwner: z.object({
        id: z.string(),
        email: z.string(),
    })
})

export type IResponseSnippet = z.infer<typeof ResponsePostSnippet>;

export const responseControllerSnippet = z.object({
    snippet: ResponsePostSnippet,
    message: z.union([z.string(), z.string()]),
})

export type typeResponseControllerSnippet = z.infer<typeof responseControllerSnippet>;


/** POST SNIPPET DESC AI  */

export const DescAIValidator = z.object({
    description: z.string()
        .trim()
        .min(20,"Description must be a minimum of 20 characters"),
})

export type typeDescAIValidator = z.infer<typeof DescAIValidator>

/** POST QUERY AI */

export const validatorQuerySearch = z.object({
    query: z.string()
        .trim()
        .min(1,"query is required"),
})

export type typeValidatorQuerySearch = z.infer<typeof validatorQuerySearch>
