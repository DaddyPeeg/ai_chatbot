import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { DropdownMenuTrigger } from './ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { ChevronUpIcon } from '@radix-ui/react-icons'

function DropTrigger({ title }: { title: string }) {
  return (
    <DropdownMenuTrigger asChild>
      <div className="flex items-center gap-2 cursor-pointer">
        {title}
        <span className={cn('transition-all')}>
          <ChevronUpIcon />
        </span>
      </div>
    </DropdownMenuTrigger>
  )
}

export default React.memo(DropTrigger)
