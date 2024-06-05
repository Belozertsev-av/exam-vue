export type Icon = 'submit'
    | 'cross'
    | 'delete'
    | 'avatar'
    | 'default'
    | 'alert'
    | 'info'
    | 'warning'
    | 'theme'

export type Size = "s" | "m" | "l"

export type Variant = 'outlined' | 'default'

export type Action = 'action' | 'success' | 'fail' | 'warning' | 'alert' | 'info' | 'normal'

export type IconData = {
    src: string,
    alt: string
}