import {
  LayoutDashboard,
  TrendingUp,
  Lightbulb,
  Landmark,
  FileText,
  HelpCircle,
  LogOut,
} from 'lucide-react'

/**
 * Primary navigation items for the sidebar.
 * `id` is used for active state matching and future routing.
 */
export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { id: 'markets', label: 'Markets', path: '/markets', icon: TrendingUp },
  { id: 'insights', label: 'Insights', path: '/insights', icon: Lightbulb },
  { id: 'wealth-hub', label: 'Wealth Hub', path: '/wealth-hub', icon: Landmark },
  { id: 'documents', label: 'Documents', path: '/documents', icon: FileText },
]

export const BOTTOM_NAV_ITEMS = [
  { id: 'help', label: 'Help Center', icon: HelpCircle },
  { id: 'logout', label: 'Logout', icon: LogOut },
]
