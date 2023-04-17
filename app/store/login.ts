import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface LoginStore {
    login_token: string;

    updateUser: (_: string) => void;
    userToken: () => string;
}
export const LOGIN_KEY = "chat-login";
export const useLoginStore = create<LoginStore>()(
    persist(
        (set, get) => ({
            login_token: "",
            updateUser(login_token: string) {
                console.log(login_token, '?login_token');

                set((state) => ({ login_token }));
            },
            userToken() {
                // has token or has code or disabled access control
                return get().login_token
            },
        }),
        {
            name: LOGIN_KEY,
            version: 1,
        },
    ),
);