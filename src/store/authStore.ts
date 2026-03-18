import { create } from 'zustand'
import {z} from "zod";
import {persist} from "zustand/middleware";


const User = z.object({
    id: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
})

//type typeUser = z.infer<typeof User>

const Session = z.object({
    refreshToken: z.string().nullable(),
    user: User
}).nullable();

type typeSession = z.infer<typeof Session>

type AuthState = {
    session: typeSession,
    setSession: (session: typeSession) => void,
    logout: () => void,
}

export const useAuthStore = create<AuthState>()(
    persist(
        (setState) => ({
            session: null,

            logout: async() => {
                setState({session: null});
            },

            setSession: (session: typeSession) => {
                setState({session: session});
            }
        }),
        {
            name: "auth-storage",
        }
    )
)