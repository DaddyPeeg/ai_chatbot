import { ReloadIcon } from '@radix-ui/react-icons'
import React from 'react'

const ChatFailed = () => {
  return (
    <div className="h-dvh w-full justify-center items-center flex flex-col">
      <h1 className="font-avenirnextltproregular text-2xl text-center px-16">
        Oops! Something Went Wrong
      </h1>
      <p className="text-sm text-center px-12">
        Please check Your Internet Connection and try again
      </p>
      <span
        className="mt-8 cursor-pointer"
        onClick={() => {
          window.location.reload()
        }}
      >
        <ReloadIcon className="hover:animate-spin" height={40} width={40} />
      </span>
    </div>
  )
}

export default ChatFailed
