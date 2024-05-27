'use client'

import React, { Dispatch, SetStateAction } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu'
import DropdownTrigger from './dropdown-trigger'

export function DropdownMenuComp({ title }: { title: string }) {
  return (
    <DropdownMenu onOpenChange={() => {}}>
      <DropdownTrigger title={title} />
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Main Title</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Item 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Item 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Item 3</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Subgroup Title</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Subdropdown</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <span>Item 1</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Item 2</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <span>Subitem</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
