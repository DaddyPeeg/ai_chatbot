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
  const [messages] = useUIState<typeof AI>()

  React.useEffect(() => {
    if (isAtBottom) return
    scrollToBottom()
  }, [messages.length])

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'z-10  shadow-md transition-opacity duration-300',
        isAtBottom
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100 pointer-events-auto',
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
