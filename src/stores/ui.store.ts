import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

type UIStore = {
  isSidebarOpen: boolean;
  isHydrated: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  setHydrated: () => void;
};

type UIStoreCreator = StateCreator<UIStore>;

const uiStoreCreator: UIStoreCreator = (set) => ({
  isSidebarOpen: true,
  isHydrated: false,
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  setHydrated: () => set({ isHydrated: true }),
});

export const useUIStore = create<UIStore>()(
  persist(uiStoreCreator, {
    name: "ui-store",
    partialize: (state) => ({ isSidebarOpen: state.isSidebarOpen }),
    onRehydrateStorage: () => (state) => {
      state?.setHydrated();
    },
  })
);
