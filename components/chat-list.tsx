import { Separator } from '@/components/ui/separator'
import { AIState, UIState } from '@/lib/chat/actions'
import { Session } from '@/lib/types'
import Link from 'next/link'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { BotMessage } from './stocks'
import { UserMessage } from './stocks/message'

export interface ChatList {
  messages: any
  session?: Session
  isShared: boolean
}

export function ChatList({ messages, session, isShared }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="mx-auto max-w-2xl px-4">
      {messages.map((message: any, index: any) => (
        <div key={message.id}>
          {message.type === 'user' && (
            <UserMessage>{message.display}</UserMessage>
          )}
          {message.type === 'bot' &&
            (message.status ? (
              <BotMessage content={message.display} />
            ) : (
              <BotMessage content={'Bot Response Error (Fallback)'} />
            ))}

          {message.type === 'bot' &&
            message.components &&
            message.components.length > 0 &&
            message.components.map((item: any, index: any) => {
              if (item.signal && item.signal === 'openWidget') {
                return (
                  <div
                    key={index}
                    className="rounded-md flex justify-center border py-4 mt-4"
                  >
                    <Link
                      className="px-6 py-2 bg-green-500 font-bold text-white rounded-md"
                      href={item.data}
                    >
                      Goto Survey
                    </Link>
                  </div>
                )
              }
            })}
          {index < messages.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  )
}
