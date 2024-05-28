import { SidebarDesktop } from '@/components/sidebar-desktop'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    // h-[calc(100vh_-_theme(spacing.16))]
    <div className="relative flex overflow-hidden">
      <SidebarDesktop />
      {children}
    </div>
  )
}
