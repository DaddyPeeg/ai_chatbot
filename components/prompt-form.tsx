'use client'

import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { useActions, useAIState, useUIState } from 'ai/rsc'

import { BotMessage, UserMessage } from './stocks/message'
import { type AI } from '@/lib/chat/actions'
import { Button } from '@/components/ui/button'
import { IconArrowElbow, IconPlus, IconStop } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'
import useStorage from '@/lib/hooks/use-storage'

export function PromptForm({
  input,
  setInput
}: {
  input: string
  setInput: (value: string) => void
}) {
  const router = useRouter()
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const { submitUserMessage } = useActions()
  const [messages, setMessages] = useUIState<typeof AI>()
  const [aiState, setAiState] = useAIState<typeof AI>()
  const { getItem, setItem, removeItem } = useStorage()
  const [isStreaming, setIsStreaming] = React.useState(true)
  const hasRunEffect = React.useRef(false)

  console.log(aiState)

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  React.useEffect(() => {
    if (!isStreaming && hasRunEffect.current) {
      const threadId = getItem('chat_thread', 'session')
      setItem(
        'chat-thread-history',
        JSON.stringify({ threadId, messages: [...messages] }),
        'local'
      )
    }
    hasRunEffect.current = true
  }, [isStreaming])

  return (
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        e.preventDefault()
        if (aiState.isChatting) return

        setAiState(prevState => ({ ...prevState, isChatting: true }))
        setIsStreaming(true)

        // Blur focus on mobile
        if (window.innerWidth < 600) {
          e.target['message']?.blur()
        }

        const value = input.trim()
        setInput('')
        if (!value) return

        // Optimistically add user message UI
        setMessages(currentMessages => [
          ...currentMessages,
          {
            id: nanoid(),
            display: value,
            type: 'user'
          }
        ])

        const nanoID = nanoid()

        setMessages(currentMessages => [
          ...currentMessages,
          {
            id: nanoID,
            display: '',
            type: 'bot'
          }
        ])

        const thread = getItem('chat_thread')

        const restructuredObject = {
          sessionID: thread,
          prompt: value
        }
        const chat: any = await fetch(
          'https://chatbot-be.int-node.srv-01.xyzapps.xyz/api/ai/call',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(restructuredObject)
          }
        )
        if (!chat.ok) {
          console.log('Failed to fetch data')
          return
        }
        const reader = chat.body.getReader()
        let decoder = new TextDecoder()
        let botMessage = ''
        while (true) {
          const { done, value } = await reader.read()
          const chunk = decoder.decode(value, { stream: true }).split('\n')
          if (done) break
          const filteredChunk = chunk.filter(entry => entry !== '')
          for (const decodedChunk of filteredChunk) {
            if (!decodedChunk) {
              continue
            }
            try {
              const parsedChunk = JSON.parse(decodedChunk)
              if (parsedChunk?._type === 'done') {
                break
              }
              switch (parsedChunk._type) {
                case 'response': {
                  botMessage += `${parsedChunk.response}`
                  setMessages(prevMessage => {
                    const newMessage = prevMessage.map(m => {
                      if (m.id === nanoID) {
                        return {
                          ...m,
                          display: botMessage
                        }
                      }
                      return m
                    })

                    return newMessage
                  })
                  break
                }
                case 'function_call': {
                  botMessage += `\n[Calling function: ${parsedChunk.functionName}]\n\n`
                  setMessages(prevMessage => {
                    const newMessage = prevMessage.map(m => {
                      if (m.id === nanoID) {
                        return {
                          ...m,
                          display: botMessage
                        }
                      }
                      return m
                    })

                    return newMessage
                  })
                  break
                }
                case 'function_fetch': {
                  botMessage += `>> Done\n\n`
                  setMessages(prevMessage => {
                    const newMessage = prevMessage.map(m => {
                      if (m.id === nanoID) {
                        return {
                          ...m,
                          display: botMessage
                        }
                      }
                      return m
                    })

                    return newMessage
                  })
                  break
                }
              }
            } catch (e) {
              console.log('Something went wrong parsing JSON', e)
              continue
            }
          }
        }
        setIsStreaming(false)
        setAiState(prevState => ({ ...prevState, isChatting: false }))
      }}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-[14px] size-8 rounded-full bg-background p-0 sm:left-4"
              onClick={() => {
                removeItem('chat_thread', 'session')
                removeItem('chat-thread-history', 'local')
                router.push('/new')
              }}
            >
              <IconPlus />
              <span className="sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <div className="absolute right-0 top-[13px] sm:right-4">
          {!aiState.isChatting ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="submit" size="icon" disabled={input === ''}>
                  <IconArrowElbow />
                  <span className="sr-only">Send message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="button" size="icon">
                  <IconStop />
                  <span className="sr-only">Stop Response</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Stop Response</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </form>
  )
}
