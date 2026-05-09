import { useState, useEffect } from 'react'
import { cn } from '../../utils/cn'
import { useUIStore } from '../../store/useUIStore'
import { useDebounce } from '../../hooks/useDebounce'
import { useAnalytics } from '../../hooks/useAnalytics'
import {
  Search,
  Bell,
  Settings,
  Menu,
  Moon,
  Sun,
} from 'lucide-react'

/**
 * TopHeader — institutional-grade dashboard header.
 *
 * Design principles:
 * - Clean spacing with subtle tonal separation from the content area
 * - No heavy borders — relies on background contrast
 * - Information density without crowding
 */

export default function TopHeader() {
  const { theme, toggleTheme, toggleMobileSidebar } = useUIStore()
  const { trackEvent } = useAnalytics()
  
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 400)

  // Track search interactions after debounce
  useEffect(() => {
    if (debouncedSearch.trim().length > 0) {
      trackEvent('dashboard_search_used', { query: debouncedSearch })
      // Here you would typically trigger the actual data filtering/search API call
    }
  }, [debouncedSearch, trackEvent])

  const handleThemeToggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    toggleTheme()
    trackEvent('theme_toggled', { nextTheme })
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex h-[var(--header-height)] shrink-0 items-center gap-4',
        'bg-bg-deep/80 px-6 backdrop-blur-md',
        'border-b border-border-subtle'
      )}
    >
      {/* Mobile menu trigger */}
      <button
        onClick={toggleMobileSidebar}
        aria-label="Toggle navigation menu"
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-[var(--radius-button)]',
          'text-text-muted transition-fast hover:bg-surface-mid hover:text-text-secondary',
          'cursor-pointer lg:hidden'
        )}
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-lg">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search portfolio or markets..."
          aria-label="Search portfolio or markets"
          className={cn(
            'h-9 w-full rounded-[var(--radius-button)] bg-surface-mid pl-9 pr-4',
            'text-body text-text-primary placeholder:text-text-muted',
            'border border-transparent transition-fast',
            'focus:border-border-active focus:outline-none',
            'hover:bg-surface-high'
          )}
        />
      </div>

      {/* Right section */}
      <div className="ml-auto flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={handleThemeToggle}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-[var(--radius-button)]',
            'text-text-muted transition-fast hover:bg-surface-mid hover:text-text-secondary',
            'cursor-pointer'
          )}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className={cn(
            'relative flex h-9 w-9 items-center justify-center rounded-[var(--radius-button)]',
            'text-text-muted transition-fast hover:bg-surface-mid hover:text-text-secondary',
            'cursor-pointer'
          )}
        >
          <Bell size={18} />
          {/* Unread indicator */}
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary-blue" />
        </button>

        {/* Settings */}
        <button
          aria-label="Settings"
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-[var(--radius-button)]',
            'text-text-muted transition-fast hover:bg-surface-mid hover:text-text-secondary',
            'cursor-pointer'
          )}
        >
          <Settings size={18} />
        </button>

        {/* Profile avatar */}
        <button
          aria-label="User profile"
          className={cn(
            'ml-1 flex h-8 w-8 items-center justify-center rounded-full',
            'bg-primary-blue/20 text-[13px] font-semibold text-primary-blue',
            'transition-fast hover:bg-primary-blue/30 cursor-pointer'
          )}
        >
          RN
        </button>
      </div>
    </header>
  )
}
