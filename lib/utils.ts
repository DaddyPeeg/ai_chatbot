import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
) // 7-character random string

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    const json = await res.json()
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number
      }
      error.status = res.status
      throw error
    } else {
      throw new Error('An unexpected error occurred')
    }
  }

  return res.json()
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)

export const runAsyncFnWithoutBlocking = (
  fn: (...args: any) => Promise<any>
) => {
  fn()
}

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

export enum ResultCode {
  InvalidCredentials = 'INVALID_CREDENTIALS',
  InvalidSubmission = 'INVALID_SUBMISSION',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UnknownError = 'UNKNOWN_ERROR',
  UserCreated = 'USER_CREATED',
  UserLoggedIn = 'USER_LOGGED_IN'
}

export const getMessageFromCode = (resultCode: string) => {
  switch (resultCode) {
    case ResultCode.InvalidCredentials:
      return 'Invalid credentials!'
    case ResultCode.InvalidSubmission:
      return 'Invalid submission, please try again!'
    case ResultCode.UserAlreadyExists:
      return 'User already exists, please log in!'
    case ResultCode.UserCreated:
      return 'User created, welcome!'
    case ResultCode.UnknownError:
      return 'Something went wrong, please try again!'
    case ResultCode.UserLoggedIn:
      return 'Logged in!'
  }
}

export async function fetchDataWithAbort(
  // signal: any,
  contoller: any,
  restructuredObject: any,
  setMessages: any,
  nanoID: any,
  setIsStreaming: any,
  setAiState: any
) {
  contoller.current = new AbortController()
  const signal = contoller.current.signal
  try {
    const chat: any = await fetch(
      'https://chatbot-be.int-node.srv-01.xyzapps.xyz/api/ai/call',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(restructuredObject),
        signal
      }
    )
    if (!chat.ok) {
      setAiState((prevState: any) => ({ ...prevState, isChatting: false }))
      setMessages((prevMessage: any) => {
        const newMessage = prevMessage.map((m: any) => {
          if (m.id === nanoID) {
            return {
              ...m,
              status: false
            }
          }
          return m
        })
        return newMessage
      })
      return
    }
    const reader = chat.body.getReader()
    let decoder = new TextDecoder()
    let botMessage = ''
    while (true) {
      const { done, value } = await reader.read()

      const chunk = decoder.decode(value, { stream: true }).split('\n')
      if (done) break

      const filteredChunk = chunk.filter(entry => entry !== '')
      for (const decodedChunk of filteredChunk) {
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
              botMessage += `${parsedChunk.response}`
              setMessages((prevMessage: any) => {
                const newMessage = prevMessage.map((m: any) => {
                  if (m.id === nanoID) {
                    return {
                      ...m,
                      display: botMessage
                    }
                  }
                  return m
                })

                return newMessage
              })
              break
            }
            case 'function_call': {
              botMessage += `\n[Calling function: ${parsedChunk.functionName}]\n\n`
              setMessages((prevMessage: any) => {
                const newMessage = prevMessage.map((m: any) => {
                  if (m.id === nanoID) {
                    return {
                      ...m,
                      display: botMessage
                    }
                  }
                  return m
                })

                return newMessage
              })
              break
            }
            case 'function_fetch': {
              botMessage += `>> Done\n\n`
              setMessages((prevMessage: any) => {
                const newMessage = prevMessage.map((m: any) => {
                  if (m.id === nanoID) {
                    return {
                      ...m,
                      display: botMessage
                    }
                  }
                  return m
                })

                return newMessage
              })
              break
            }
          }
        } catch (e: any) {
          if (e.name === 'SyntaxError') {
            continue
          }
          console.log(e)
          return
        }
      }
    }
    setIsStreaming(false)
    setAiState((prevState: any) => ({ ...prevState, isChatting: false }))
  } catch (e: any) {
    setIsStreaming(false)
    setAiState((prevState: any) => ({ ...prevState, isChatting: false }))
    if (e.name === 'AbortError') {
      setMessages((prevMessage: any) => {
        const newMessage = prevMessage.map((m: any) => {
          if (m.id === nanoID && !Boolean(m.display)) {
            return {
              ...m,
              display: 'Response Aborted'
            }
          }
          return m
        })
        return newMessage
      })
      return
    }
    setMessages((prevMessage: any) => {
      const newMessage = prevMessage.map((m: any) => {
        if (m.id === nanoID) {
          return {
            ...m,
            status: false
          }
        }
        return m
      })
      return newMessage
    })
  }
}
