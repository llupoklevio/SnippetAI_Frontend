import {z} from "zod";

export const loginValidator = z.object({
    email: z.string()
        .trim()
        .min(6, "Email is required")
        .refine((val : any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), "Invalid email address"),
    password: z.string()
        .trim()
        .min(6, "Password is required with minimum 6 characters")
        .regex(/[A-Z]/, "One word must be uppercased")
        .regex(/[0-9]/, "One ore more numbers must be on password"),
})

export type loginSend = z.infer<typeof loginValidator>

export const registerValidator = z.object({
    firstName:
        z.string()
            .trim()
            .min(1, "First name is required")
            .regex(/^[a-zA-Z]+$/, "Only words"),
    lastName:
        z.string()
            .trim()
            .min(1, "Last name is required")
            .regex(/^[a-zA-Z]+$/, "Only words"),
    email:
        z.string()
            .trim()
            .min(6, "Email is required")
            .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), "Invalid email address"),
    password:
        z.string()
            .trim()
            .min(6, "Password is required with minimum 6 characters")
            .regex(/[A-Z]/, "One word must be uppercased")
            .regex(/[0-9]/, "One ore more numbers must be on password"),
});

export type registerSend = z.infer<typeof registerValidator>


/** REGISTER API */

export const registerDTO = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
})

export type typeRegisterDTO = z.infer<typeof registerDTO>

export const responseRegisterSuccess = z.object({
    user: registerDTO
})

export type typeResponseRegisterSuccess = z.infer<typeof responseRegisterSuccess>


/** LOGIN API */

const responseServiceLogin = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    user: registerDTO
})

export type typeResponseServiceLogin = z.infer<typeof responseServiceLogin>

export const responseLoginAPI = z.object({
    message: z.string(),
    session: responseServiceLogin
})

export type typeResponseLoginAPI = z.infer<typeof responseLoginAPI>

