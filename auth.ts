import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'
import { z } from 'zod'
import { getStringFromBuffer } from './lib/utils'
import { getUser } from './app/login/actions'

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            username: z.string().min(1),
            password: z.string().min(6)
          })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { username } = parsedCredentials.data
          const user = await getUser(parsedCredentials.data)

          if (!user) return null

          return { ...user, username }
        }

        return null
      }
    })
  ]
})
