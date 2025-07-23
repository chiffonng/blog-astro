import type { MenuItem, MenuItemConfig, SubmenuItem } from '@/types/site-config'

export interface NavHelpers {
  hasChildren: (item: MenuItemConfig) => item is SubmenuItem
  isActiveLink: (link: string) => boolean
  hasActiveSubmenuItem: (submenu: MenuItem[]) => boolean
}

export function createNavigationHelpers(currentPath: string): NavHelpers {
  const hasChildren = (item: MenuItemConfig): item is SubmenuItem => {
    return 'submenu' in item
  }

  const isActiveLink = (link: string): boolean => {
    if (link === '/' && currentPath === '/') return true
    if (link !== '/') {
      // Ensure we match complete path segments to avoid false positives
      // e.g. /blog should not match /blog-archive
      const normalizedLink = link.endsWith('/') ? link.slice(0, -1) : link
      const normalizedPath = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath

      return normalizedPath === normalizedLink || normalizedPath.startsWith(normalizedLink + '/')
    }
    return false
  }

  const hasActiveSubmenuItem = (submenu: MenuItem[]): boolean => {
    return submenu.some((item) => isActiveLink(item.link))
  }

  return {
    hasChildren,
    isActiveLink,
    hasActiveSubmenuItem
  }
}
