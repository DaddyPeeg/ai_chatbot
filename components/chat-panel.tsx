import * as React from 'react'

import { shareChat } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconShare } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'
import { ChatShareDialog } from '@/components/chat-share-dialog'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import type { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { BotMessage, UserMessage } from './stocks/message'
import useStorage from '@/lib/hooks/use-storage'
import { fetchDataWithAbort } from '@/lib/chat_response'

export interface ChatPanelProps {
  id?: string
  title?: string
  input: string
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
}

export function ChatPanel({
  input,
  setInput,
  isAtBottom,
  scrollToBottom
}: ChatPanelProps) {
  const [aiState, setAiState] = useAIState<typeof AI>()
  const [messages, setMessages] = useUIState<typeof AI>()
  const { getItem, setItem } = useStorage()
  const [isStreaming, setIsStreaming] = React.useState(true)
  const hasRunEffect = React.useRef(false)

  const controller = React.useRef(new AbortController())
  const signal = React.useMemo(() => {
    return controller.current.signal
  }, [controller.current])

  const abortButtonHandler = () => {
    controller.current.abort()
    console.log('Fetch request manually aborted')
    // controller.current = new AbortController()
  }

  React.useEffect(() => {
    if (!isStreaming && hasRunEffect.current) {
      const chatID = getItem('chatID', 'session')
      setItem(
        'chat-thread-history',
        JSON.stringify({ chatID, messages: [...messages] }),
        'local'
      )
    }
    hasRunEffect.current = true
  }, [isStreaming])

  const exampleMessages = [
    {
      heading: 'Insurance Plans',
      subheading: 'What are the available health insurance plans in my area?',
      message: `What are the available health insurance plans in my area?`
    },
    {
      heading: 'Healthcare Providers',
      subheading: 'Who are the available healthcare providers near me?',
      message: 'Who are the available healthcare providers near me?'
    },
    {
      heading: 'Healthcare Options',
      subheading:
        'What healthcare options are available in the state of Texas?',
      message: `What health care options are available in the state of Texas?`
    },
    {
      heading: 'Drug Information',
      subheading: 'Can you tell me the information for a specific medication?',
      message: `Can you tell me the information for a specific medication?`
    }
  ]

  return (
    <div className="fixed items-center flex flex-col inset-x-0 bottom-0 w-full bg-transparent duration-300 ease-in-out animate-in peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px] gap-4">
      <div className="mx-auto">
        <ButtonScrollToBottom
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
        />
      </div>
      <div className="sm:px-4 sm:max-w-2xl w-full">
        {messages.length === 0 && (
          <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
            {exampleMessages.map((example, index) => (
              <div
                key={example.heading}
                className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                  index > 1 && 'hidden md:block'
                }`}
                onClick={async () => {
                  if (aiState.isChatting) return
                  setAiState(prevState => ({
                    ...prevState,
                    isChatting: true
                  }))
                  setIsStreaming(true)
                  setMessages(currentMessages => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: example.message,
                      type: 'user'
                    }
                  ])

                  const nanoID = nanoid()

                  setMessages(currentMessages => [
                    ...currentMessages,
                    {
                      id: nanoID,
                      display: '',
                      type: 'bot',
                      status: true
                    }
                  ])

                  const thread = getItem('chatID')
                  const restructuredObject = {
                    chatID: thread,
                    prompt: example.message,
                    templateID: process.env.NEXT_PUBLIC_CHAT_TEMP_ID
                  }
                  fetchDataWithAbort(
                    controller,
                    restructuredObject,
                    setMessages,
                    nanoID,
                    setIsStreaming,
                    setAiState
                  )
                }}
              >
                <div className="text-sm font-semibold">{example.heading}</div>
                <div className="text-sm text-zinc-600">
                  {example.subheading}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="border-t bg-background sm:px-4 shadow-lg sm:rounded-t-xl sm:border sm:py-4">
          <PromptForm
            input={input}
            setInput={setInput}
            signal={signal}
            controller={controller}
            abortButtonHandler={abortButtonHandler}
            isAtBottom={isAtBottom}
            scrollToBottom={scrollToBottom}
          />
        </div>
      </div>
    </div>
  )
}
