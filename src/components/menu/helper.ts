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
    if (link !== '/' && currentPath.startsWith(link)) return true
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
