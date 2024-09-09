'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// import { Footer, Media } from '../../../../payload/payload-types'
// import { inclusions, noHeaderFooterUrls, profileNavItems } from '../../../constants'
import { Button } from '../../Button'
import { Gutter } from '../../Gutter'
import {Footer, Media} from "../../../payload/payload-types";
import {inclusions, noHeaderFooterUrls} from "../../../constants";

const FooterComponent = ({ footer }: { footer: Footer }) => {
  const pathname = usePathname()
  const navItems = footer?.navItems || []

  return (
    <footer className={noHeaderFooterUrls.includes(pathname) ? 'hidden' : ''}>
      <Gutter>
        <ul className="grid justify-center gap-8 p-0 grid-cols-4 my-24 lg:grid-cols-2 md:my-16 sm:grid-cols-1">
          {inclusions.map(inclusion => (
            <li key={inclusion.title}>
              <Image
                src={inclusion.icon || ''}
                alt={inclusion.title || ''}
                width={36}
                height={36}
                className="mb-4"
              />

              <h5 className="text-center flex items-center">{inclusion.title || ''}</h5>
              <p>{inclusion.description || ''}</p>
            </li>
          ))}
        </ul>
      </Gutter>

      <div className="py-8 bg-theme-elevation-1000 text-theme-elevation-0 dark:bg-theme-elevation-50 dark:text-theme-elevation-1000">
        <Gutter>
          <div className="flex justify-between items-center flex-wrap gap-2 sm:flex-col sm:justify-center sm:text-center sm:mt-8">
            <Link href="/">
              <Image src="/logo-white.svg" alt="logo" width={170} height={50} />
            </Link>

            <p>{footer?.copyright || ''}</p>

            <div className="flex gap-5">
              {navItems.map(item => {
                const icon = item?.link?.icon as Media

                return (
                  <Button
                    key={item.link.label || ''}
                    el="link"
                    href={item.link.url || ''}
                    newTab={true}
                    className="w-full"
                  >
                    <Image
                      src={icon?.url || ''}
                      alt={item.link.label || ''}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </Button>
                )
              })}
            </div>
          </div>
        </Gutter>
      </div>
    </footer>
  )
}

export default FooterComponent
