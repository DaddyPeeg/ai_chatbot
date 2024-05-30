import { Sidebar } from '@/components/sidebar'

import { auth } from '@/auth'
import { ChatHistory } from '@/components/chat-history'

export async function SidebarDesktop() {
  // const session = await auth()

  // if (!session?.user?.id) {
  //   return null
  // }

  return (
    <Sidebar className="peer hidden bg-white/80 backdrop-blur-lg lg:block absolute inset-y-0 z-30 -translate-x-full border-r h-full duration-300 ease-in-out data-[state=open]:translate-x-0 lg:w-[250px] xl:w-[300px]">
      {/* @ts-ignore */}
      <ChatHistory />
    </Sidebar>
  )
}
