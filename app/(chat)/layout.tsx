import { Header } from '@/components/header-chat'
import { SidebarDesktop } from '@/components/sidebar-desktop'
import { Button } from '@/components/ui/button2'
import { useSidebar } from '@/lib/hooks/use-sidebar'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    // h-[calc(100vh_-_theme(spacing.16))]
    // h-[calc(100vh_-_5rem)]
    <div className="flex flex-1 overflow-hidden">{children}</div>
  )
}
