import {z} from "zod";
import { create } from 'zustand'
import {persist} from "zustand/middleware";

const stateDesc = z.record(z.string(), z.string()).nullable();

type DescAI = {snippetId: string, description: string}

type typeStateDesc = z.infer<typeof stateDesc>

interface StateDescStore {
    stateDesc: typeStateDesc ;
    setStateDesc: (data: DescAI) => void;
    deleteSingleDesc: (id: string) => void
}

export const useStateDescStoreAI = create<StateDescStore>()(
    persist(
        (setState, getState) => ({

            stateDesc: null,

            setStateDesc: async (data : DescAI) => {

                const dataDescAI = getState().stateDesc
                const updated: Record<string, string> = dataDescAI ?? {};

                updated[data.snippetId] = data.description;
                setState({
                    stateDesc:updated
                });
            },

            deleteSingleDesc: (id: string) => {
                const dataDescAI = getState().stateDesc;
                if (!dataDescAI) return;

                const updated = { ...dataDescAI };
                delete updated[id];

                setState({ stateDesc: updated });
            }
        }),
        {
            name: "descAI-storage"
        }
    )
)