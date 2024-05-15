'use server'

import { signIn } from '@/auth'
import { User } from '@/lib/types'
import { AuthError } from 'next-auth'
import { z } from 'zod'
import { kv } from '@vercel/kv'
import { ResultCode } from '@/lib/utils'

export async function getUser(data: { username: string; password: string }) {
  const newdata = {
    username: data.username,
    password: data.password
  }
  try {
    const res = await fetch(
      'https://chatbot-be.int-node.srv-01.xyzapps.xyz/api/auth/signin',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newdata)
      }
    )
    if (!res.ok) {
      throw new Error('Error Loggin in')
    }
    const result = await res.json()
    return result
  } catch (e) {
    throw new Error('INTERNAL_SERVER_ERROR')
  }
}

interface Result {
  type: string
  resultCode: ResultCode
}

export async function authenticate(
  _prevState: Result | undefined,
  formData: FormData
): Promise<Result | undefined> {
  try {
    const username = formData.get('username')
    const password = formData.get('password')
    const parsedCredentials = z
      .object({
        username: z.string().min(1),
        password: z.string().min(6)
      })
      .safeParse({
        username,
        password
      })
    if (parsedCredentials.success) {
      await signIn('credentials', {
        username,
        password,
        redirect: false
      })

      return {
        type: 'success',
        resultCode: ResultCode.UserLoggedIn
      }
    } else {
      return {
        type: 'error',
        resultCode: ResultCode.InvalidCredentials
      }
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            type: 'error',
            resultCode: ResultCode.InvalidCredentials
          }
        default:
          return {
            type: 'error',
            resultCode: ResultCode.UnknownError
          }
      }
    }
  }
}
