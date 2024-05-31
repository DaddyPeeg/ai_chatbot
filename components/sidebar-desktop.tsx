import { Sidebar } from '@/components/sidebar'

import { auth } from '@/auth'
import { ChatHistory } from '@/components/chat-history'

export function SidebarDesktop() {
  // const session = await auth()

  // if (!session?.user?.id) {
  //   return null
  // }

  return (
    <Sidebar className="hidden bg-white/80 backdrop-blur-lg lg:flex inset-y-0 z-30 -translate-x-full border-r duration-300 ease-in-out data-[state=open]:translate-x-0 lg:w-[250px] xl:w-[300px]">
      {/* @ts-ignore */}
      <ChatHistory />
    </Sidebar>
  )
}
