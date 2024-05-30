'use client'
import useStorage from '@/lib/hooks/use-storage'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function NewPage() {
  const { removeItem } = useStorage()
  const router = useRouter()

  useEffect(() => {
    removeItem('chatID', 'session')
    removeItem('chat-thread-history', 'local')
    router.replace('/chat')
  })
}
