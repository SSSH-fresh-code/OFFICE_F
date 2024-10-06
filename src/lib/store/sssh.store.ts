import { StateCreator, StoreApi, create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface SsshState {
	title?: string;
	setTitle: (title: string) => void;
}

const ssshStore: (s: StoreApi<SsshState>["setState"]) => SsshState = (set) => ({
	setTitle: (title) => set((s) => ({ ...s, title })),
});

const useSsshStore = create<SsshState>(
	persist(devtools(ssshStore), {
		name: "ssshStore",
		partialize: (state) => state,
	}) as StateCreator<SsshState, [], []>,
);
export default useSsshStore;
