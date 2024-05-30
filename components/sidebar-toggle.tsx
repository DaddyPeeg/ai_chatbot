'use client'

import * as React from 'react'

import { useSidebar } from '@/lib/hooks/use-sidebar'
import { Button } from '@/components/ui/button2'
import { DoubleArrowRightIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'

export function SidebarToggle() {
  const { toggleMobileSidebar } = useSidebar()

  return (
    <Button
      variant="ghost"
      className="flex px-2 lg:hidden hover:bg-transparent hover:text-white"
      onClick={() => {
        toggleMobileSidebar()
      }}
    >
      <HamburgerMenuIcon height={20} width={20} />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}
