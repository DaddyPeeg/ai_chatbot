import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import Wrapper from './wrapper'
import { ChatPanel } from './chat-panel'

const ChatLoading = () => {
  return (
    <Wrapper>
      <div className="justify-center h-dvh hidden xl:flex">
        <div className="flex flex-col gap-8 w-[50rem] relative items-center py-8">
          <div className="flex space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[500px]" />
              <Skeleton className="h-4 w-[500px]" />
              <Skeleton className="h-4 w-[500px]" />
              <Skeleton className="h-4 w-[450px]" />
            </div>
          </div>
          <Separator />
          <div className="flex space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[500px]" />
              <Skeleton className="h-4 w-[500px]" />
              <Skeleton className="h-4 w-[500px]" />
              <Skeleton className="h-4 w-[450px]" />
            </div>
          </div>
          <Separator />
          <div className="flex space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[500px]" />
              <Skeleton className="h-4 w-[500px]" />
              <Skeleton className="h-4 w-[500px]" />
              <Skeleton className="h-4 w-[450px]" />
            </div>
          </div>
          <Separator />
          <div className="flex space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[500px]" />
              <Skeleton className="h-4 w-[500px]" />
              <Skeleton className="h-4 w-[500px]" />
              <Skeleton className="h-4 w-[450px]" />
            </div>
          </div>
          <Separator />
          <div className="flex space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[500px]" />
              <Skeleton className="h-4 w-[500px]" />
              <Skeleton className="h-4 w-[500px]" />
              <Skeleton className="h-4 w-[450px]" />
            </div>
          </div>
          <div className="absolute bottom-0 w-full">
            <div className="h-32 flex flex-col items-center rounded-t-lg border border-b-0">
              <div className="flex gap-4 w-full  px-4">
                <Skeleton className="h-12 w-[93%] my-4" />
                <Skeleton className="h-12 w-12 my-4" />
              </div>
              <Skeleton className="h-4 w-[50%]" />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden justify-center h-dvh lg:flex">
        <div className="flex flex-col gap-8 relative items-center py-8">
          <div className="flex space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-2 w-[400px]" />
              <Skeleton className="h-2 w-[400px]" />
              <Skeleton className="h-2 w-[400px]" />
              <Skeleton className="h-2 w-[350px]" />
            </div>
          </div>
          <Separator />
          <div className="flex space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-2 w-[400px]" />
              <Skeleton className="h-2 w-[400px]" />
              <Skeleton className="h-2 w-[400px]" />
              <Skeleton className="h-2 w-[350px]" />
            </div>
          </div>
          <Separator />
          <div className="flex space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-2 w-[400px]" />
              <Skeleton className="h-2 w-[400px]" />
              <Skeleton className="h-2 w-[400px]" />
              <Skeleton className="h-2 w-[350px]" />
            </div>
          </div>
          <Separator />
          <div className="flex space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-2 w-[400px]" />
              <Skeleton className="h-2 w-[400px]" />
              <Skeleton className="h-2 w-[400px]" />
              <Skeleton className="h-2 w-[350px]" />
            </div>
          </div>
          <Separator />
          <div className="flex space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-2 w-[400px]" />
              <Skeleton className="h-2 w-[400px]" />
              <Skeleton className="h-2 w-[400px]" />
              <Skeleton className="h-2 w-[350px]" />
            </div>
          </div>
          <Separator />
          <div className="absolute bottom-0 w-full">
            <div className="h-24 flex flex-col items-center rounded-t-lg border border-b-0">
              <div className="flex gap-4 w-full px-4">
                <Skeleton className="h-8 w-[93%] my-4" />
                <Skeleton className="h-8 w-8 my-4" />
              </div>
              <Skeleton className="h-3 w-[50%]" />
            </div>
          </div>
        </div>
      </div>
      <div className="justify-center h-dvh flex lg:hidden">
        <div className="flex flex-col gap-4 relative items-center py-8">
          <div className="flex space-x-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[150px]" />
            </div>
          </div>
          <Separator />
          <div className="flex space-x-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[150px]" />
            </div>
          </div>
          <Separator />
          <div className="flex space-x-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[150px]" />
            </div>
          </div>
          <Separator />
          <div className="flex space-x-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[150px]" />
            </div>
          </div>
          <Separator />
          <div className="flex space-x-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[150px]" />
            </div>
          </div>
          <Separator />
          <div className="flex space-x-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[150px]" />
            </div>
          </div>
          <Separator />
          <div className="flex space-x-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[150px]" />
            </div>
          </div>
          <Separator />
          <div className="flex space-x-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[150px]" />
            </div>
          </div>
          <Separator />
          <div className="flex space-x-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[200px]" />
              <Skeleton className="h-1 w-[150px]" />
            </div>
          </div>
          <Separator />

          <div className="absolute bottom-0 w-full">
            <div className="h-12 flex flex-col items-center rounded-t-lg border border-b-0">
              <div className="flex gap-1 w-full px-1">
                <Skeleton className="h-4 w-[100%] my-1" />
                <Skeleton className="h-4 w-4 my-1" />
              </div>
              <Skeleton className="h-3 w-[50%] my-2" />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default ChatLoading
