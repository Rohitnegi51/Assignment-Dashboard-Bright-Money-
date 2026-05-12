import {
  LayoutDashboard,
  Wallet,
  ArrowRightLeft,
  PieChart,
  Lightbulb,
  HelpCircle,
  LogOut,
} from 'lucide-react'

/**
 * Primary navigation items for the sidebar.
 * `id` is used for active state matching and future routing.
 */
export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { id: 'accounts', label: 'Accounts', path: '/accounts', icon: Wallet },
  { id: 'transactions', label: 'Transactions', path: '/transactions', icon: ArrowRightLeft },
  { id: 'budgets', label: 'Budgets', path: '/budgets', icon: PieChart },
  { id: 'insights', label: 'Insights', path: '/insights', icon: Lightbulb },
]

export const BOTTOM_NAV_ITEMS = [
  { id: 'help', label: 'Help Center', icon: HelpCircle },
  { id: 'logout', label: 'Logout', icon: LogOut },
]
