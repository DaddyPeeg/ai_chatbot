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
  const [aiState, setAiState] = useAIState<typeof AI>()
  const { getChatThread } = useActions()
  const { getItem, setItem } = useStorage()
  const hasRunEffect = useRef(false)
  const hasRunEffect_2 = useRef(false)
  const [_, setNewChatId] = useLocalStorage('newChatId', id)
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

  useEffect(() => {
    if (hasRunEffect.current) return
    if (getItem('chat_thread', 'session')) return
    ;(async () => {
      const res = await getChatThread()
      if (!res.ok && !res.sessionID) {
        setAiState((prevState: any) => ({ ...prevState, connection: 'false' }))
        toast.error(res.message)
        return
      }
      setAiState((prevState: any) => ({ ...prevState, connection: 'true' }))
      setItem('chat_thread', res.sessionID)

      const local_storage_items = getItem('chat-thread-history', 'local')
      if (!local_storage_items) return
      const storage_chat_history = JSON.parse(local_storage_items)
      if (res.sessionID === storage_chat_history.threadId) {
        setMessages(prev => [...prev, ...storage_chat_history.messages])
      }
    })()

    hasRunEffect.current = true
  }, [hasRunEffect.current])

  useEffect(() => {
    if (hasRunEffect_2.current) return
    const threadID = getItem('chat_thread', 'session')
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
    if (threadID === storage_chat_history.threadId) {
      setMessages(prev => [...prev, ...storage_chat_history.messages])
    }
    hasRunEffect_2.current = true
  }, [hasRunEffect_2.current, aiState.connection])

  useEffect(() => {
    //TODO: Fix Rerenders
    if (session) {
      console.log('wew')
      router.replace('/')
    }
  }, [])

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  if (aiState.connection === 'loading') {
    return <div>Loading</div>
  }

  if (aiState.connection === 'false') {
    return <div>Please check your internet connection and refresh the page</div>
  }

  if (aiState.connection === 'true') {
    return (
      <div
        className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px] border"
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
          <div className="h-px border w-full" ref={visibilityRef} />
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
}
