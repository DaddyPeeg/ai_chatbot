'use client'

import * as React from 'react'
import { useUIState } from 'ai/rsc'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import { IconArrowDown } from '@/components/ui/icons'
import { AI } from '@/lib/chat/actions'

interface ButtonScrollToBottomProps extends ButtonProps {
  isAtBottom: boolean
  scrollToBottom: () => void
}

export function ButtonScrollToBottom({
  className,
  isAtBottom,
  scrollToBottom,
  ...props
}: ButtonScrollToBottomProps) {
<<<<<<< HEAD
  console.log(isAtBottom)
=======
  const [messages] = useUIState<typeof AI>()

  React.useEffect(() => {
    if (isAtBottom) return
    console.log('wew')
    scrollToBottom()
  }, [messages.length])

>>>>>>> c4c6e8de638635068a1201e41f0f8c24486fba66
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'absolute right-4 top-1 z-10 bg-background transition-opacity duration-300 sm:right-8 md:top-2',
        isAtBottom ? 'opacity-0' : 'opacity-100',
        className
      )}
      onClick={() => scrollToBottom()}
      {...props}
    >
      <IconArrowDown />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  )
}
