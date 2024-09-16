import { ReadUserDto } from "sssh-library";
import { StateCreator, StoreApi, create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface UserState {
  user?: ReadUserDto,
  login: (user: ReadUserDto) => void,
  logout: () => void
}

const userStore: (s: StoreApi<UserState>['setState']) => UserState = (set) => ({
  login: (user) => set((s) => ({...s, user: user})),
  logout: () => {
    set((s) => ({ ...s, user:undefined }))
    location.href = "/";
    location.reload();
  }
});

const useUserStore = create<UserState>(
  persist(devtools(userStore), { name: "userStore", partialize: (state) => ({ user: state.user }) }) as StateCreator<UserState, [], []>
);
export default useUserStore;
