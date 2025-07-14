/**
 * Check if the current platform uses Cmd key (Mac) or Ctrl key
 */
export function isMac(): boolean {
  return /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export const modifierKey: string = isMac() ? '⌘' : 'Ctrl+'
