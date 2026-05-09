import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes cleanly with conditional support.
 * Combines clsx (conditional logic) with tailwind-merge (conflict resolution).
 *
 * @param  {...any} inputs - Class values (strings, objects, arrays)
 * @returns {string} Merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
