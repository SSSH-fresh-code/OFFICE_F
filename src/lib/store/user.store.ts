import type { ReadUserDto } from "sssh-library";
import type { StateCreator, StoreApi } from "zustand";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface UserState {
	user?: ReadUserDto;
	login: (user: ReadUserDto) => void;
	logout: () => void;
}

const userStore: (s: StoreApi<UserState>["setState"]) => UserState = (set) => ({
	login: (user) => set((s) => ({ ...s, ...user })),
	logout: () => {
		set((s) => ({ ...s, user: undefined }));
	},
});

const useUserStore = create<UserState>(
	persist(devtools(userStore), {
		name: "userStore",
		partialize: (state) => state,
	}) as StateCreator<UserState, [], []>,
);
export default useUserStore;
