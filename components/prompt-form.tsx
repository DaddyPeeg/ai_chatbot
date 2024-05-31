'use client'

import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { useAIState, useUIState } from 'ai/rsc'

import { type AI } from '@/lib/chat/actions'
import { Button } from '@/components/ui/button2'
import { IconArrowElbow, IconStop } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { nanoid } from 'nanoid'

import useStorage from '@/lib/hooks/use-storage'
import { fetchDataWithAbort } from '@/lib/chat_response'

export function PromptForm({
  input,
  setInput,
  signal,
  controller,
  abortButtonHandler,
  isAtBottom,
  scrollToBottom
}: {
  input: string
  setInput: (value: string) => void
  signal: any
  controller: any
  abortButtonHandler: () => void
  isAtBottom: boolean
  scrollToBottom: () => void
}) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const [messages, setMessages] = useUIState<typeof AI>()
  const [aiState, setAiState] = useAIState<typeof AI>()
  const { getItem, setItem, removeItem } = useStorage()
  const [isStreaming, setIsStreaming] = React.useState(true)
  const hasRunEffect = React.useRef(false)

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

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
            type: 'bot',
            status: true
          }
        ])

        const thread = getItem('chatID')
        const restructuredObject = {
          chatID: thread,
          prompt: value,
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
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background sm:rounded-md ">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="w-full sm:border py-[1.22rem] overflow-auto resize-none bg-transparent pr-14 pl-4 focus-within:outline-none text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <div className="absolute right-4 bottom-[0.8rem]">
          {!aiState.isChatting ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="bg-custom_secondary"
                  type="submit"
                  size="icon"
                  disabled={input === ''}
                >
                  <IconArrowElbow />
                  <span className="sr-only">Send message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="bg-custom_secondary"
                  type="button"
                  size="icon"
                  // onClick={() => abortButtonHandler()}
                >
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
