import { useState, useEffect, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../utils/cn'
import { useUIStore } from '../../store/useUIStore'
import { useAnalytics } from '../../hooks/useAnalytics'
import { NAV_ITEMS, BOTTOM_NAV_ITEMS } from '../../constants/navigation'
import {
  Sparkles,
} from 'lucide-react'

/**
 * Sidebar — primary navigation for Wealth Curator.
 *
 * State architecture:
 * - isMobileSidebarOpen: controls overlay drawer on mobile/tablet (<lg)
 * - isDesktopSidebarCollapsed: controls icon-only collapsed state on desktop (>=lg)
 * These are independent — toggling one does NOT affect the other.
 */

function NavItem({ item, collapsed, onClick }) {
  const Icon = item.icon

  return (
    <NavLink
      to={item.path || '/'}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'group flex w-full items-center gap-3 rounded-[var(--radius-button)] px-3 py-2.5',
          'text-body transition-fast cursor-pointer',
          'focus-visible:outline-2 focus-visible:outline-primary-blue',
          isActive
            ? 'bg-primary-blue-muted text-primary-blue'
            : 'text-text-secondary hover:bg-[rgba(255,255,255,0.04)] hover:text-text-primary',
          collapsed && 'justify-center px-0'
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={20}
            strokeWidth={1.8}
            className={cn(
              'shrink-0 transition-fast',
              isActive ? 'text-primary-blue' : 'text-text-muted group-hover:text-text-secondary'
            )}
          />
          {!collapsed && (
            <span className="truncate">{item.label}</span>
          )}
        </>
      )}
    </NavLink>
  )
}

function PremiumCTA({ collapsed }) {
  if (collapsed) return null

  return (
    <div className="mx-3 rounded-[var(--radius-element)] bg-[rgba(0,88,190,0.08)] p-4">
      <div className="mb-2 flex items-center gap-2">
        <Sparkles size={16} className="text-primary-blue" />
        <span className="text-label text-primary-blue tracking-[var(--letter-spacing-caps)]">
          Premium
        </span>
      </div>
      <p className="mb-3 text-[var(--font-size-label)] leading-relaxed text-text-muted">
        Unlock AI-powered insights and advanced analytics.
      </p>
      <button
        className={cn(
          'w-full rounded-[var(--radius-button)] bg-primary-blue px-3 py-2',
          'text-[var(--font-size-label)] font-medium text-white',
          'transition-fast hover:bg-primary-blue-hover cursor-pointer',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue'
        )}
      >
        Upgrade Plan
      </button>
    </div>
  )
}

export default function Sidebar() {
  const {
    isMobileSidebarOpen,
    closeMobileSidebar,
    isDesktopSidebarCollapsed,
    toggleDesktopSidebar,
  } = useUIStore()
  const { trackEvent } = useAnalytics()

  // ESC key closes mobile sidebar
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && isMobileSidebarOpen) {
      closeMobileSidebar()
    }
  }, [isMobileSidebarOpen, closeMobileSidebar])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <>
      {/* Mobile overlay backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-[var(--theme-overlay-bg)] transition-fast lg:hidden',
          isMobileSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={closeMobileSidebar}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 flex h-dvh flex-col bg-surface-low',
          'transition-smooth',
          // Mobile: slide in/out
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          // Desktop: always visible, width controlled by collapse state
          'lg:relative lg:z-auto lg:translate-x-0',
          isDesktopSidebarCollapsed
            ? 'lg:w-[var(--sidebar-collapsed-width)]'
            : 'w-[var(--sidebar-width)]'
        )}
        aria-label="Main navigation"
      >
        {/* Brand */}
        <div className="flex h-[var(--header-height)] shrink-0 items-center gap-3 px-5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-tag)] bg-primary-blue">
            <span className="text-[13px] font-bold leading-none text-white">W</span>
          </div>
          {!isDesktopSidebarCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-[15px] font-semibold tracking-tight text-text-primary">
                Wealth Curator
              </span>
              <span className="text-[var(--font-size-label)] text-text-muted">
                by Proton Finance
              </span>
            </div>
          )}
        </div>

        {/* Primary nav */}
        <nav className="mt-2 flex-1 space-y-1 overflow-y-auto px-3" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              collapsed={isDesktopSidebarCollapsed}
              onClick={() => {
                trackEvent('sidebar_navigation_clicked', { destination: item.id })
                if (isMobileSidebarOpen) closeMobileSidebar()
              }}
            />
          ))}
        </nav>

        {/* Premium CTA */}
        <div className="mb-3">
          <PremiumCTA collapsed={isDesktopSidebarCollapsed} />
        </div>

        {/* Bottom nav */}
        <div className="space-y-1 border-t border-border-subtle px-3 pt-3 pb-4">
          {BOTTOM_NAV_ITEMS.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              collapsed={isDesktopSidebarCollapsed}
              onClick={() => {
                trackEvent('sidebar_navigation_clicked', { destination: item.id })
                if (isMobileSidebarOpen) closeMobileSidebar()
              }}
            />
          ))}
        </div>

        
      </aside>
    </>
  )
}
