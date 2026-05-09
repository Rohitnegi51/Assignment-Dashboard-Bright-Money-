import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardHome from './pages/DashboardHome'
import Insights from './pages/Insights'
import { useUIStore } from './store/useUIStore'
import { useLocalStorage } from './hooks/useLocalStorage'

/**
 * App — root component.
 *
 * Responsibilities:
 * - Apply theme class to document root
 * - Render layout shell
 * - Future: wrap with RouterProvider, QueryClientProvider
 */

export default function App() {
  const { 
    theme, 
    setTheme, 
    isDesktopSidebarCollapsed, 
    setDesktopSidebarCollapsed 
  } = useUIStore()

  // 1. Read persistent state safely
  const [persistedTheme, setPersistedTheme] = useLocalStorage('wc-theme', 'dark')
  const [persistedSidebar, setPersistedSidebar] = useLocalStorage('wc-sidebar-collapsed', false)

  // 2. Hydrate Zustand on mount
  useEffect(() => {
    setTheme(persistedTheme)
    setDesktopSidebarCollapsed(persistedSidebar)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 3. Sync Zustand changes back to localStorage
  useEffect(() => {
    setPersistedTheme(theme)
  }, [theme, setPersistedTheme])

  useEffect(() => {
    setPersistedSidebar(isDesktopSidebarCollapsed)
  }, [isDesktopSidebarCollapsed, setPersistedSidebar])

  // Sync theme class to <html> for Tailwind dark mode
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme === 'light')
  }, [theme])

  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/insights" element={<Insights />} />
          {/* Catch-all redirect for unimplemented routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  )
}
