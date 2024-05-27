import * as React from 'react'
import Wrapper from './wrapper'
import { DropdownMenuComp } from './dropdown-button'
import Link from 'next/link'
import { Button } from './ui/button2'
export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
        <Wrapper>
          <div className="flex h-full items-center justify-between">
            <span className="font-bold">Logo</span>
            <div className="flex gap-2 items-center">
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
        </Wrapper>
      </React.Suspense>
    </header>
  )
}
