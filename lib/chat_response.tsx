import { ReactElement } from 'react'
import { toast } from 'sonner'

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
      'https://chatbot-be-2.int-node.srv-01.xyzapps.xyz/api/ai/call',
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
      const newDD = await chat.json()

      if (
        newDD &&
        newDD.error === 'Internal Server Error' &&
        newDD.message === 'Template not found'
      ) {
        toast.error('Chat Template ID not set.')
      }
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
      setIsStreaming(false)
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
          if (
            parsedChunk?.type === 'node' &&
            parsedChunk?.data === '5750nqz7'
          ) {
            break
          }
          switch (parsedChunk.type) {
            case 'response': {
              botMessage += `${parsedChunk.data}`
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
            case 'newline': {
              botMessage += `\n`
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
            case 'signal': {
              const newComp: any = parsedChunk.data
              setMessages((prevMessage: any) => {
                const newMessage = prevMessage.map((m: any) => {
                  if (m.id === nanoID) {
                    const componentsArray = prevMessage.components || []
                    return {
                      ...m,
                      components: [...componentsArray, newComp]
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
    setMessages((prevMessage: any) => {
      const newMessage = prevMessage.map((m: any) => {
        if (m.id === nanoID && m.display === '') {
          return {
            ...m,
            status: false
          }
        }
        return m
      })
      return newMessage
    })
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
