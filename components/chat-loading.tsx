import React from 'react'
import Image from 'next/image'
import { ChatBotIcon } from '@/public/assets'

const ChatLoading = () => {
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="font-avenirnextltproregular text-3xl">
          Healthcare Chat Bot
        </h1>
        <h2 className="">I&lsquo;m here for your insurance needs</h2>
        <Image
          src={ChatBotIcon}
          alt="chat-bot-icon"
          width={150}
          height={150}
          className="animate-pulse mt-4"
          priority
        />
      </div>
    </div>
  )
}

export default ChatLoading
