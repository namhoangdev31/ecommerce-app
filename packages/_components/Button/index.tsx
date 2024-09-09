'use client'

import React, { ElementType } from 'react'
import Link from 'next/link'

export type Props = {
  label?: string
  appearance?: 'default' | 'primary' | 'secondary' | 'none'
  el?: 'button' | 'link' | 'a'
  onClick?: () => void
  href?: string
  newTab?: boolean
  className?: string
  type?: 'submit' | 'button'
  disabled?: boolean
  invert?: boolean
  children?: React.ReactNode
}

export const Button: React.FC<Props> = ({
  el: elFromProps = 'link',
  label,
  newTab,
  href,
  appearance,
  className: classNameFromProps,
  onClick,
  type = 'button',
  disabled,
  invert,
  children,
}) => {
  let el = elFromProps

  const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  const className = [
    'border-none cursor-pointer inline-flex justify-center bg-transparent no-underline inline-flex p-2.5 px-6 font-inherit leading-inherit text-inherit rounded-lg',
    classNameFromProps,
    appearance === 'primary' && 'bg-theme-elevation-1000 text-theme-elevation-0',
    appearance === 'secondary' && 'bg-transparent shadow-inset-0-0-0-1px-theme-elevation-1000',
    appearance === 'default' && 'p-0 text-theme-text',
    appearance === 'none' && 'p-0 text-theme-text',
    invert && appearance === 'primary' && 'bg-theme-elevation-0 text-theme-elevation-1000',
    invert && appearance === 'secondary' && 'bg-theme-elevation-1000 shadow-inset-0-0-0-1px-theme-elevation-0',
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <div className="flex items-center justify-around">
      <span className="text-center flex items-center">{label}</span>
      {children}
    </div>
  )

  if (onClick || type === 'submit') el = 'button'

  if (el === 'link') {
    return (
      <Link href={href || ''} className={className} {...newTabProps} onClick={onClick}>
        {content}
      </Link>
    )
  }

  const Element: ElementType = el

  return (
    <Element
      href={href}
      className={className}
      type={type}
      {...newTabProps}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </Element>
  )
}
