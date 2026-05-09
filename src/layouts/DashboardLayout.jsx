import Sidebar from '../components/layout/Sidebar'
import TopHeader from '../components/layout/TopHeader'

/**
 * DashboardLayout — root layout for all dashboard pages.
 *
 * Architecture:
 * - Sidebar (fixed/relative depending on viewport)
 * - TopHeader (sticky within content column)
 * - Main content area (scrollable, receives children)
 *
 * Prepared for:
 * - React.lazy + Suspense content injection
 * - Future route-based page rendering via children
 * - Bento-style grid composition in child pages
 */

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-dvh overflow-hidden bg-bg-deep">
      {/* Sidebar */}
      <Sidebar />

      {/* Main column */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopHeader />

        {/* Content area */}
        <main
          className="flex-1 overflow-y-auto p-6 lg:p-8"
          id="main-content"
          role="main"
        >
          {children}
        </main>
      </div>
    </div>
  )
}
