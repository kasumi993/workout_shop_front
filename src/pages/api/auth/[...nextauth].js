import NextAuth from 'next-auth'

export default NextAuth({
  providers: [
    // Add providers later
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    },
  },
  pages: {
    // Redirect to home instead of auth pages for now
    signIn: '/',
    signOut: '/',
    error: '/',
  },
})