import 'server-only'

import {
  createAI,
  createStreamableUI,
  createStreamableValue,
  getAIState,
  getMutableAIState
} from 'ai/rsc'
import { BotCard, BotMessage, Stock, Purchase } from '@/components/stocks'

import { z } from 'zod'
import { Events } from '@/components/stocks/events'
import { Stocks } from '@/components/stocks/stocks'
import { nanoid } from '@/lib/utils'
import { saveChat } from '@/app/actions'
import { SpinnerMessage, UserMessage } from '@/components/stocks/message'
import { Chat } from '@/lib/types'
import { auth } from '@/auth'

let THREAD_ID = ''
async function utilChat(chat: any, text: any, newText: any) {
  const reader = chat.body.getReader()
  let decoder = new TextDecoder()
  text.update('')
  while (true) {
    const { done, value } = await reader.read()
    const chunk = decoder.decode(value, { stream: true }).split('\n')
    if (done) break
    for (const decodedChunk of chunk) {
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
            text.append(<>{parsedChunk.response}</>)
            newText.update(parsedChunk.response)
            break
          }
          case 'function_call': {
            text.update(
              <>{`\n[Calling function: ${parsedChunk.functionName}]\n\n`}</>
            )
            newText.update(
              `[Calling function: ${parsedChunk.functionName}]\n\n`
            )
            break
          }
          case 'function_fetch': {
            text.update(<>{`\n>> Done\n`}</>)
            newText.update(`>> Done\n\n`)
            break
          }
        }
      } catch (e) {
        continue
      }
    }
  }
  text.done()
  newText.done()
}

async function submitUserMessage(content: string) {
  'use server'
  const text = createStreamableUI(<SpinnerMessage />)
  const newText = createStreamableValue()
  ;(async () => {
    if (THREAD_ID !== '') {
      const restructuredObject = {
        sessionID: THREAD_ID,
        prompt: content
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
        throw new Error('Failed to fetch data')
      }
      await utilChat(chat, text, newText)
    } else {
      const init = await fetch(
        'https://chatbot-be.int-node.srv-01.xyzapps.xyz/api/ai/start',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (!init.ok) {
        return
      }

      const initData = await init.json()
      THREAD_ID = initData.sessionID
      const restructuredObject = {
        sessionID: initData.sessionID,
        prompt: content
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
        throw new Error('Failed to fetch data')
      }
      await utilChat(chat, text, newText)
    }
  })()
  return {
    id: nanoid(),
    display: text.value,
    newDisplay: newText.value
  }
}

export type Message = {
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
  content: string
  id: string
  name?: string
}

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const aiState = getAIState()

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return
    }
  },
  onSetAIState: async ({ state, done }) => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const { chatId, messages } = state

      const createdAt = new Date()
      const userId = session.user.id as string
      const path = `/chat/${chatId}`
      const title = messages[0].content.substring(0, 100)

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path
      }

      await saveChat(chat)
    } else {
      return
    }
  }
})

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter(message => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'user' ? (
          <UserMessage>{message.content}</UserMessage>
        ) : (
          <BotMessage content={message.content} />
        )
    }))
}
