import { useCallback, useRef, useState, useEffect } from 'react'
import SectionHeader from '../ui/SectionHeader'
import PaginationDots from '../ui/PaginationDots'
import CategoryCard from './CategoryCard'
import { useAnalytics } from '../../hooks/useAnalytics'

/**
 * SpendingCategories — horizontally scrollable carousel section.
 *
 * Supports any number of categories — not hardcoded to 5.
 * PaginationDots reflect the current scroll "page" position.
 *
 * @param {object} props
 * @param {Array} props.categories — array of category data objects from budgetData
 * @param {number} [props.pageSize=5] — number of visible cards per "page" on desktop
 */

export default function SpendingCategories({ categories, pageSize = 5 }) {
  const { trackEvent } = useAnalytics()
  const scrollRef = useRef(null)
  const [activePage, setActivePage] = useState(0)

  const totalPages = Math.max(1, Math.ceil(categories.length / pageSize))

  // Track scroll position to update pagination dots
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container
      const maxScroll = scrollWidth - clientWidth
      if (maxScroll <= 0) {
        setActivePage(0)
        return
      }
      const progress = scrollLeft / maxScroll
      const page = Math.round(progress * (totalPages - 1))
      setActivePage(page)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [totalPages])

  const handleDotClick = useCallback(
    (pageIndex) => {
      const container = scrollRef.current
      if (!container) return
      const { scrollWidth, clientWidth } = container
      const maxScroll = scrollWidth - clientWidth
      const targetScroll = totalPages <= 1 ? 0 : (pageIndex / (totalPages - 1)) * maxScroll
      container.scrollTo({ left: targetScroll, behavior: 'smooth' })
      trackEvent('budget_categories_paginated', { page: pageIndex })
    },
    [totalPages, trackEvent]
  )

  const handleCategoryClick = useCallback(
    (categoryId) => {
      trackEvent('budget_category_clicked', { category: categoryId })
    },
    [trackEvent]
  )

  return (
    <section aria-labelledby="spending-categories-title">
      <SectionHeader
        title="Spending Categories"
        headingClassName="text-[var(--font-size-headline)] font-bold tracking-[var(--letter-spacing-tight)]"
        actions={
          totalPages > 1 && (
            <PaginationDots
              total={totalPages}
              active={activePage}
              onClick={handleDotClick}
            />
          )
        }
        className="mb-5"
      />

      {/* Scrollable carousel track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory scrollbar-hide"
        role="region"
        aria-label="Spending categories carousel"
      >
        {categories.map((category) => (
          <div
            key={category.id}
            className="w-[220px] min-w-[220px] flex-shrink-0 snap-start lg:w-0 lg:min-w-0 lg:flex-1"
          >
            <CategoryCard
              category={category}
              onClick={() => handleCategoryClick(category.id)}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
