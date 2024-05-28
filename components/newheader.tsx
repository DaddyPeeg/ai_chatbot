'use client'

import * as React from 'react'
import Wrapper from './wrapper'
import { DropdownMenuComp } from './dropdown-button'
import Link from 'next/link'
import { Button } from './ui/button2'
import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <>
      <header
        className={cn(
          'fixed top-0 z-50 flex items-center justify-between w-full border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl transition-all overflow-hidden',
          !isOpen ? 'h-16' : 'h-dvh'
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
                <DropdownMenuComp title="Dropdown" />
                <Link href="">
                  <p className="px-4">Nav1</p>
                </Link>
                <Link href="">
                  <p className="px-4">Nav2</p>
                </Link>
                <Link href="">
                  <p className="px-4">Nav3</p>
                </Link>
                <div className="flex items-center gap-2">
                  <Link href={'/chat'}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full uppercase  border-[1px] text-xs"
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Button size="sm" className="rounded-full uppercase text-xs">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
            <div className="gap-2 items-center lg:hidden">
              <div className="py-4">
                <DropdownMenuComp title="Dropdown" />
              </div>

              <Link href="">
                <p className="py-4">Nav1</p>
              </Link>
              <Link href="">
                <p className="py-4">Nav2</p>
              </Link>
              <Link href="">
                <p className="py-4">Nav3</p>
              </Link>
              <div className="flex items-center gap-2 py-4">
                <Link href={'/chat'}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full uppercase  border-[1px] text-xs"
                  >
                    Sign in
                  </Button>
                </Link>
                <Button size="sm" className="rounded-full uppercase text-xs">
                  Get Started
                </Button>
              </div>
            </div>
          </Wrapper>
        </React.Suspense>
      </header>
    </>
  )
}

const Navigation = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={cn(
        'absolute z-50 w-full h-[calc(100dvh_-_4rem)] top-0 transition-all bg-red-500',
        isOpen ? 'left-[0rem]' : 'left-[200rem]'
      )}
    >
      <div className="mt-8">
        <Wrapper>
          <div className="gap-2 flex flex-col">
            <DropdownMenuComp title="Dropdown" />
            <Link href="" className=" py-4">
              <p className="">Nav1</p>
            </Link>
            <Link href="" className=" py-4">
              <p className="">Nav2</p>
            </Link>
            <Link href="" className=" py-4">
              <p className="">Nav3</p>
            </Link>
            <div className="flex items-center gap-2 py-4">
              <Link href={'/chat'}>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full uppercase  border-[1px] text-xs"
                >
                  Sign in
                </Button>
              </Link>
              <Button size="sm" className="rounded-full uppercase text-xs">
                Get Started
              </Button>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  )
}
