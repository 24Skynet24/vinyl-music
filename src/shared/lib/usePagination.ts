import { useState } from "react"

interface UsePaginationResult<T> {
    visibleItems: T[]
    hasMore: boolean
    showMore: () => void
}

/**
 * Reveals a list gradually: shows `step` items at a time and exposes
 * a `showMore` handler that adds another `step` until everything is visible.
 */
export function usePagination<T>(items: T[], step: number): UsePaginationResult<T> {
    const [visibleCount, setVisibleCount] = useState(step)

    const visibleItems = items.slice(0, visibleCount)
    const hasMore = visibleCount < items.length
    const showMore = () => setVisibleCount((count) => count + step)

    return { visibleItems, hasMore, showMore }
}
