import * as React from 'react'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import { SidebarList } from '@/components/sidebar-list'
import { buttonVariants } from '@/components/ui/button'
import { IconPlus } from '@/components/ui/icons'
import { SidebarToggle } from './sidebar-toggle'
import { ArrowLeft } from 'lucide-react'

interface ChatHistoryProps {
  userId?: string
}

export function ChatHistory({ userId }: ChatHistoryProps) {
  return (
    <div className="flex flex-col h-full relative">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'h-10 w-14 mt-1 text-xl rounded-full justify-start px-4 shadow-none '
        )}
      >
        <ArrowLeft />
      </Link>
      <div className="flex items-center justify-between p-4">
        <h4 className="text-sm font-medium">Chat History</h4>
      </div>
      <div className="mb-2 px-2">
        <Link
          href="/new"
          className={cn(
            buttonVariants({ variant: 'default' }),
            'h-10 w-full justify-start px-4 shadow-none text-custom_primary-foreground bg-custom_primary hover:bg-custom_accent'
          )}
        >
          <IconPlus className="-translate-x-2 stroke-2" />
          New Chat
        </Link>
      </div>
      <React.Suspense
        fallback={
          <div className="flex flex-col flex-1 px-4 space-y-4 overflow-auto">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-6 rounded-md shrink-0 animate-pulse bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        }
      >
        {/* @ts-ignore */}
        <SidebarList />
      </React.Suspense>
    </div>
  )
}
