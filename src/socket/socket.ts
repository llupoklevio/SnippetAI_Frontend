import { io } from "socket.io-client";
import {useAuthStore} from "../store/authStore.ts";


let socketSnippet: ReturnType<typeof io> | null = null;

export const getSocketSnippet = () => {
    if (!socketSnippet) {
        const session = useAuthStore.getState().session;

        socketSnippet = io("/snippet", {
            autoConnect: false,
            extraHeaders: {
                authorization: `Bearer ${session?.accessToken}`
            }
        });
    }
    return socketSnippet;
};
