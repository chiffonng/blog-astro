export type KbdProps = {
  keys?: (
    | 'cmd'
    | 'shift'
    | 'ctrl'
    | 'option'
    | 'enter'
    | 'del'
    | 'esc'
    | 'tab'
    | 'capslock'
    | 'up'
    | 'down'
    | 'left'
    | 'right'
    | 'pageup'
    | 'pagedown'
    | 'home'
    | 'end'
    | 'help'
    | 'space'
  )[]
  className?: string
}
// Keyboard utility types
export interface KeyCombo {
  key: string
  ctrl?: boolean
  meta?: boolean
  shift?: boolean
  alt?: boolean
}

export interface MagicKeysConfig {
  [key: string]: KeyCombo | string
}

export interface KeyboardHandler {
  register: (key: string | KeyCombo, handler: () => void) => void
  unregister: (key: string) => void
  destroy: () => void
}
