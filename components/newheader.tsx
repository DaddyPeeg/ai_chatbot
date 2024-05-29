'use client'

import * as React from 'react'
import Wrapper from './wrapper'
import { DropdownMenuComp } from './dropdown-button'
import Link from 'next/link'
import { Button } from './ui/button2'
import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { NavigationMenuComp } from './navigation-menu'
import { AccordionComp } from './accordion-comp'
export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const mainBody = React.useRef(document.body)

  React.useEffect(() => {
    if (isOpen) {
      mainBody.current.style.overflowY = 'hidden'
      return
    }
    mainBody.current.style.overflowY = 'auto'
  }, [isOpen])
  return (
    <>
      <header
        className={cn(
          'fixed top-0 z-50 flex items-center justify-between w-full border-b shrink-0 transition-all overflow-hidden lg:overflow-visible',
          !isOpen
            ? 'h-16 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl'
            : 'h-dvh bg-white'
        )}
      >
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <Wrapper>
            <div className="flex flex-col lg:flex-row h-16 items-center justify-center">
              <div className="flex w-full justify-between items-center">
                <span className="font-bold">Logo</span>
                <span className="block lg:hidden">
                  {!isOpen ? (
                    <HamburgerMenuIcon
                      height={40}
                      width={30}
                      className="cursor-pointer"
                      onClick={() => setIsOpen(true)}
                    />
                  ) : (
                    <Cross1Icon
                      height={40}
                      width={30}
                      className="cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    />
                  )}
                </span>
              </div>

              <div className="hidden gap-2 items-center lg:flex">
                <NavigationMenuComp />
                <div className="flex items-center gap-2">
                  <Link href={''}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full uppercase bg-transparent border-[1px] text-xs"
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Button size="sm" className="rounded-full uppercase text-xs">
                    Sign up
                  </Button>
                </div>
              </div>
            </div>
            <div className="gap-2 items-center lg:hidden">
              <div className="py-4">
                <AccordionComp />
              </div>
              <Link href="">
                <p className="pb-4">Nav1</p>
              </Link>
              <Link href="">
                <p className="py-4">Nav2</p>
              </Link>
              <Link href="">
                <p className="py-4">Nav3</p>
              </Link>
              <div className="flex items-center gap-2 py-4">
                <Link href={''}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full uppercase bg-transparent border-[1px] text-xs"
                  >
                    Sign in
                  </Button>
                </Link>
                <Button size="sm" className="rounded-full uppercase text-xs">
                  Sign up
                </Button>
              </div>
            </div>
          </Wrapper>
        </React.Suspense>
      </header>
    </>
  )
}
