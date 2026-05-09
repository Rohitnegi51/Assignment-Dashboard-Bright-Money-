import { create } from 'zustand'

/**
 * Global UI state store.
 *
 * Scope: UI/presentational state ONLY.
 * Persistence is orchestrated by App.jsx using useLocalStorage.
 */
export const useUIStore = create((set) => ({
  // Theme
  theme: 'dark', // Initial default, will be hydrated by App.jsx
  setTheme: (theme) => set({ theme }), // Added setter for hydration
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

  // Sidebar — mobile and desktop are independent concerns
  isMobileSidebarOpen: false,
  toggleMobileSidebar: () =>
    set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
  closeMobileSidebar: () =>
    set({ isMobileSidebarOpen: false }),

  isDesktopSidebarCollapsed: false, // Initial default, will be hydrated by App.jsx
  setDesktopSidebarCollapsed: (isCollapsed) => set({ isDesktopSidebarCollapsed: isCollapsed }), // Added setter for hydration
  toggleDesktopSidebar: () =>
    set((state) => ({ isDesktopSidebarCollapsed: !state.isDesktopSidebarCollapsed })),
}))
