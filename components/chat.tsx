'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { useEffect, useRef, useState } from 'react'
import { useUIState, useAIState, useActions } from 'ai/rsc'
import { usePathname, useRouter } from 'next/navigation'
import { Message } from '@/lib/chat/actions'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import type { AI } from '@/lib/chat/actions'
import { toast } from 'sonner'
import useStorage from '@/lib/hooks/use-storage'
import ChatLoading from './chat-loading'
import ChatFailed from './ui/chat-failed'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  session?: any
}

export function Chat({ className, session }: ChatProps) {
  const router = useRouter()
  const path = usePathname()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useUIState<typeof AI>()
  const [aiState, setAiState] = useAIState<typeof AI>()
  const { getChatThread } = useActions()
  const { getItem, setItem } = useStorage()
  const hasRunEffect = useRef(false)
  const hasRunEffect_2 = useRef(false)

  useEffect(() => {
    const messagesLength = aiState.messages?.length
    if (messagesLength === 2) {
      router.refresh()
    }
  }, [aiState.messages, router])

  useEffect(() => {
    if (hasRunEffect.current) return
    if (getItem('chatID', 'session')) return
    ;(async () => {
      const res = await getChatThread()
      if (
        !res.ok &&
        !res.chatID &&
        (aiState.connection === 'true' || aiState.connection === 'loading')
      ) {
        setAiState((prevState: any) => ({ ...prevState, connection: 'false' }))
        toast.error(res.message)
        return
      }
      setAiState((prevState: any) => ({ ...prevState, connection: 'true' }))
      setItem('chatID', res.chatID)

      const local_storage_items = getItem('chat-thread-history', 'local')
      if (!local_storage_items) return
      const storage_chat_history = JSON.parse(local_storage_items)
      if (res.chatID === storage_chat_history.chatID) {
        setMessages(prev => [...prev, ...storage_chat_history.messages])
      }
    })()

    hasRunEffect.current = true
  }, [hasRunEffect.current])

  useEffect(() => {
    if (hasRunEffect_2.current) return
    const threadID = getItem('chatID', 'session')
    const local_storage_items = getItem('chat-thread-history', 'local')
    if (
      threadID &&
      (aiState.connection === 'loading' || aiState.connection === 'false')
    ) {
      setAiState(prevState => ({ ...prevState, connection: 'true' }))
    }
    if (
      !threadID ||
      !local_storage_items ||
      aiState.connection === 'false' ||
      aiState.connection === 'loading'
    ) {
      return
    }
    const storage_chat_history = JSON.parse(local_storage_items)
    if (threadID === storage_chat_history.chatID) {
      setMessages(prev => [...prev, ...storage_chat_history.messages])
    }
    hasRunEffect_2.current = true
  }, [hasRunEffect_2.current, aiState.connection])

  useEffect(() => {
    if (session) {
      router.replace('/chat')
    }
  }, [])

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  if (aiState.connection === 'loading') {
    return <ChatLoading />
  }

  if (aiState.connection === 'false') {
    return <ChatFailed />
  }

  if (aiState.connection === 'true')
    return (
      <div
        className="group w-full h-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
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
          input={input}
          setInput={setInput}
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
        />
      </div>
    )
}
