import type { KeyboardHandler, KeyCombo, MagicKeysConfig } from '@/types/kbd'

/**
 * Normalizes a key combination to a standard format
 */
function normalizeKeyCombo(combo: string | KeyCombo): KeyCombo {
  if (typeof combo === 'string') {
    // Parse string like "ctrl+k" or "cmd+k"
    const parts = combo.toLowerCase().split('+')
    const key = parts.pop() || ''

    return {
      key,
      ctrl: parts.includes('ctrl'),
      meta: parts.includes('cmd') || parts.includes('meta'),
      shift: parts.includes('shift'),
      alt: parts.includes('alt')
    }
  }
  return combo
}

/**
 * Checks if the pressed key combination matches the target combo
 */
function matchesKeyCombo(event: KeyboardEvent, combo: KeyCombo): boolean {
  const eventKey = event.key.toLowerCase()
  const targetKey = combo.key.toLowerCase()

  // Handle special key mappings
  const keyMatch =
    eventKey === targetKey ||
    (targetKey === 'esc' && eventKey === 'escape') ||
    (targetKey === 'escape' && eventKey === 'escape')

  if (!keyMatch) return false

  return (
    !!event.ctrlKey === !!combo.ctrl &&
    !!event.metaKey === !!combo.meta &&
    !!event.shiftKey === !!combo.shift &&
    !!event.altKey === !!combo.alt
  )
}

/**
 * Creates a keyboard handler similar to VueUse's useMagicKeys
 */
export function useMagicKeys(config?: MagicKeysConfig): KeyboardHandler {
  const handlers = new Map<string, { combo: KeyCombo; handler: () => void }>()

  function handleKeyDown(event: KeyboardEvent) {
    for (const [, { combo, handler }] of handlers) {
      if (matchesKeyCombo(event, combo)) {
        event.preventDefault()
        handler()
        break
      }
    }
  }

  // Add initial config
  if (config) {
    Object.entries(config).forEach(([,]) => {
      // Register expects a handler, so we'll just store the combo for now
      // This is a placeholder for future functionality
    })
  }

  document.addEventListener('keydown', handleKeyDown)

  return {
    register(key: string | KeyCombo, handler: () => void) {
      const combo = normalizeKeyCombo(key)
      const keyString =
        typeof key === 'string'
          ? key
          : `${combo.ctrl ? 'ctrl+' : ''}${combo.meta ? 'cmd+' : ''}${combo.shift ? 'shift+' : ''}${combo.alt ? 'alt+' : ''}${combo.key}`
      handlers.set(keyString, { combo, handler })
    },

    unregister(key: string) {
      handlers.delete(key)
    },

    destroy() {
      handlers.clear()
      document.removeEventListener('keydown', handleKeyDown)
    }
  }
}

/**
 * Simple utility to detect platform-specific modifier key
 */
export function getModifierKey(): 'cmd' | 'ctrl' {
  return /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'cmd' : 'ctrl'
}

/**
 * Format key combination for display
 */
export function formatKeyCombo(combo: string | KeyCombo): string {
  const normalized = normalizeKeyCombo(combo)
  const parts: string[] = []

  if (normalized.ctrl) parts.push('Ctrl')
  if (normalized.meta) parts.push(getModifierKey() === 'cmd' ? '⌘' : 'Meta')
  if (normalized.shift) parts.push('Shift')
  if (normalized.alt) parts.push('Alt')

  // Format the key
  let key = normalized.key.toUpperCase()
  if (key === 'ESCAPE') key = 'Esc'
  if (key === 'ARROWUP') key = '↑'
  if (key === 'ARROWDOWN') key = '↓'
  if (key === 'ARROWLEFT') key = '←'
  if (key === 'ARROWRIGHT') key = '→'

  parts.push(key)

  return parts.join('+')
}

/**
 * Check if the current platform uses Cmd key (Mac) or Ctrl key
 */
export function isMac(): boolean {
  return /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export const modifierKey: string = isMac() ? '⌘' : 'Ctrl+'
