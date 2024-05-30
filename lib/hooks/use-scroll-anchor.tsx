import { useUIState } from 'ai/rsc'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AI } from '../chat/actions'

export const useScrollAnchor = () => {
  const messagesRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const visibilityRef = useRef<HTMLDivElement>(null)

  const [isAtBottom, setIsAtBottom] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  const scrollToBottom = useCallback(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({
        block: 'end',
        behavior: 'smooth'
      })
    }
  }, [messagesRef.current])

  useEffect(() => {
    if (messagesRef.current) {
      if (isAtBottom && !isVisible) {
        messagesRef.current.scrollIntoView({
          block: 'end'
        })
      }
    }
  }, [isAtBottom, isVisible, messagesRef.current])

  useEffect(() => {
    const { current } = scrollRef

    if (current) {
      const handleScroll = (event: Event) => {
        const target = event.target as HTMLDivElement
        const offset = 25
        const isAtBottom =
          target.scrollTop + target.clientHeight >= target.scrollHeight - offset

        setIsAtBottom(isAtBottom)
      }

      current.addEventListener('scroll', handleScroll, {
        passive: true
      })

      return () => {
        current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [scrollRef.current])

  useEffect(() => {
    if (visibilityRef.current) {
      let observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsVisible(true)
            } else {
              setIsVisible(false)
            }
          })
        },
        {
          rootMargin: '0px 0px -150px 0px'
        }
      )

      observer.observe(visibilityRef.current)

      return () => {
        observer.disconnect()
      }
    }
  })

  return {
    messagesRef,
    scrollRef,
    visibilityRef,
    scrollToBottom,
    isAtBottom,
    isVisible
  }
}
