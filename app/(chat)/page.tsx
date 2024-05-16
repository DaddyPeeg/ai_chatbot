import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'

export const metadata = {
  title: 'Healthcare Chatbot'
}

export default async function IndexPage() {
  const id = nanoid()
  const session = await auth()
  return (
    <AI initialAIState={{ chatId: id, messages: [], isChatting: false }}>
      <Chat id={id} session={session} />
    </AI>
  )
}
