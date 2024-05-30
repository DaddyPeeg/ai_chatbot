import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import Image from 'next/image'
import { ChatBotIcon } from '@/public/assets'
import { SidebarToggle } from './sidebar-toggle'
import { SidebarMobile } from './sidebar-mobile'
import { ChatHistory } from './chat-history'

export function Header() {
  return (
    <header className="sticky py-4 top-0 z-30 flex items-center justify-between w-full px-4 border-b shrink-0 bg-custom_accent text-custom_secondary-foreground">
      <div className="flex items-center gap-4">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <div className="relative w-10 h-10">
            <span className="w-4 h-4 absolute bottom-[-2px] right-[-4px] border-2 border-white bg-green-500 z-10 rounded-full" />
            <Image
              src={ChatBotIcon}
              alt="chat_bot_icon_header"
              fill
              sizes="(max-width: 1830px) 100vw, 1830px"
            />
          </div>
          <div className="flex-col flex">
            <h1 className="text-base font-medium">Healthcare Chatbot</h1>
            <p className="text-xs">I am here to find your best insurance fit</p>
          </div>
        </React.Suspense>
      </div>
      <SidebarMobile>
        <ChatHistory />
      </SidebarMobile>
    </header>
  )
}
