import React from 'react'

import classes from './index.module.scss'

export type VerticalPaddingOptions = 'large' | 'medium' | 'none'

type Props = {
  top?: VerticalPaddingOptions
  bottom?: VerticalPaddingOptions
  children: React.ReactNode
  className?: string
}

export const VerticalPadding: React.FC<Props> = ({
  top = 'medium',
  bottom = 'medium',
  className,
  children,
}) => {
  const topPadding = top === 'large' ? 'pt-8' : top === 'medium' ? 'pt-4' : ''
  const bottomPadding = bottom === 'large' ? 'pb-8' : bottom === 'medium' ? 'pb-4' : ''

  return (
    <div
      className={[className, topPadding, bottomPadding]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
