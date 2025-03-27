import { produce } from "immer";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAccountStore = create(

    persist(
        (set) => ({
            accounts : [ ],
            loading: false,

            addAccount: (text, password, platform) => {
                set(
                    produce((state) => {
                        state.accounts.push({
                            id:Date.now(),
                            text: text,
                            password: password,
                            platform: platform,
                            completed: false,
                        })
                    })
                )
            },
            
            removeAccount: (id) => {
                set(
                    produce((state) => {
                        const index = state.accounts.findIndex((account) => account.id === id);
                        console.log("index", index);
                        if (index !== -1) {
                            state.accounts.splice(index, 1);
                        }
                    })
                )
            },

            editAccount: (id, text) => {
                set(
                    produce((state) => {
                        const account = state.accounts.find((account) => account.id === id);
                        if (account) {
                            account.text = text;
                        }
                    })
                )
            },
            
            editPassword: (id, password) => {
                set(
                    produce((state) => {
                        const account = state.accounts.find((account) => account.id === id);
                        if (account) {
                            account.password = password;
                        }
                    })
                )
            },

            editPlatform: (id, platform) => {
                set(
                    produce((state) => {
                        const account = state.accounts.find((account) => account.id === id);
                        if (account) {
                            account.platform = platform;
                        }
                    })
                )
            }   

        }),
        { name: "Accounts-storage", storage: createJSONStorage(() => localStorage )}
    )
)

export default useAccountStore;