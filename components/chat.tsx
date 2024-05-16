'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useEffect, useRef, useState } from 'react'
import { useUIState, useAIState, useActions } from 'ai/rsc'
import { Session } from '@/lib/types'
import { usePathname, useRouter } from 'next/navigation'
import { Message } from '@/lib/chat/actions'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import type { AI } from '@/lib/chat/actions'
import { toast } from 'sonner'
import useStorage from '@/lib/hooks/use-storage'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  session?: any
}

export function Chat({ id, className, session }: ChatProps) {
  const router = useRouter()
  const path = usePathname()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useUIState<typeof AI>()
  const [aiState] = useAIState()
  const { getChatThread } = useActions()
  const { getItem, setItem } = useStorage()
  const hasRunEffect = useRef(false)
  const [_, setNewChatId] = useLocalStorage('newChatId', id)
  console.log(messages)
  useEffect(() => {
    if (session?.user) {
      if (!path.includes('chat') && messages.length === 1) {
        window.history.replaceState({}, '', `/chat/${id}`)
      }
    }
  }, [id, path, session?.user, messages])

  useEffect(() => {
    const messagesLength = aiState.messages?.length
    if (messagesLength === 2) {
      router.refresh()
    }
  }, [aiState.messages, router])

  useEffect(() => {
    setNewChatId(id)
  })

  // useEffect(() => {
  //   setMessages([])
  // }, [])

  useEffect(() => {
    if (hasRunEffect.current) return
    ;(async () => {
      if (getItem('chat_thread', 'session')) {
        return
      }
      const res = await getChatThread()
      setItem('chat_thread', res.sessionID)
    })()
    const threadID = getItem('chat_thread', 'session')
    const storage_chat_history = JSON.parse(
      getItem('chat-thread-history', 'local')
    )
    if (!threadID || !storage_chat_history) return
    if (threadID === storage_chat_history.threadId) {
      setMessages(prev => [...prev, ...storage_chat_history.messages])
    }
    hasRunEffect.current = true
  }, [])

  useEffect(() => {
    if (session) {
      router.replace('/')
    }
  }, [])

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div
        className={cn('pb-[200px] pt-4 md:pt-10', className)}
        ref={messagesRef}
      >
        {messages.length ? (
          <ChatList messages={messages} isShared={false} session={session} />
        ) : (
          <EmptyScreen />
        )}
        <div className="h-px w-full" ref={visibilityRef} />
      </div>
      <ChatPanel
        id={id}
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
    </div>
  )
}
