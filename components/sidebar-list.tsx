import { clearChats, getChats } from '@/app/actions'
import { ClearHistory } from '@/components/clear-history'
import { SidebarItems } from '@/components/sidebar-items'
import { ThemeToggle } from '@/components/theme-toggle'
import { cache } from 'react'
import { Separator } from './ui/separator'

interface SidebarListProps {
  userId?: string
  children?: React.ReactNode
}

// const loadChats = cache(async (userId?: string) => {
//   return await getChats(userId)
// })

export function SidebarList({ userId }: SidebarListProps) {
  // const chats = await loadChats(userId)

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        {/* TODO: CHAT HISTORY */}
        <div className="p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Chat History is still on development
          </p>
        </div>
      </div>
      <Separator />
      <div className="flex items-center justify-between p-4">
        {/* <ThemeToggle /> */}
        {/* <ClearHistory clearChats={clearChats} isEnabled={chats?.length > 0} /> */}
        <p className="text-xs text-center">
          © 2024 Company Name. All rights reserved.
        </p>
      </div>
    </div>
  )
}
