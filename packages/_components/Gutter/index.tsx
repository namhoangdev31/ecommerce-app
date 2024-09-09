import React, { forwardRef, Ref } from 'react'

type Props = {
  left?: boolean
  right?: boolean
  className?: string
  children: React.ReactNode
  ref?: Ref<HTMLDivElement>
}

export const Gutter = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const { left = true, right = true, className, children } = props

    return (
      <div
        ref={ref}
        className={[
          'max-w-screen-2xl mx-auto',
          left && 'pl-4',
          right && 'pr-4',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
    )
  },
)

Gutter.displayName = 'Gutter'
