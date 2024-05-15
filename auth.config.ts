import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
    newUser: '/signup'
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnLoginPage = nextUrl.pathname.startsWith('/login')
      const isOnSignupPage = nextUrl.pathname.startsWith('/signup')

      if (isLoggedIn) {
        if (isOnLoginPage || isOnSignupPage) {
          return Response.redirect(new URL('/', nextUrl))
        }
      }

      return true
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.user = { accessToken: user.token, username: user.username }
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user = token.user
      }
      return session
    }
  },
  providers: []
} satisfies NextAuthConfig
