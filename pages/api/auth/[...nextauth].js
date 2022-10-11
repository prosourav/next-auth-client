import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios'

const providers = [
  CredentialsProvider({
    name: 'Credentials',
    authorize: async (credentials) => {
      try {
        const user = await axios.post(`http://localhost:8003/login`,
        {
          user: {
            password: credentials.password,
            email: credentials.email
          }
        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          }
        })

        if (user) {
          console.log('response.....with user',user.data);
          return {status: 'success', data: user.data}
        } 
      } catch (e) {
        const errorMessage = e.response.data.message
        // Redirecting to the login page with error messsage in the URL
        throw new Error(errorMessage + '&email=' + credentials.email)
      }

    }
  })
]

const callbacks = {
  async jwt(token, user) {
    console.log('hi',token);
    if (user) {
      console.log('user.......',user);
      token.accessToken = user.data.token
    }

    return token
  },

  async session(session, token) {
    session.accessToken = token.accessToken
    return session
  }
}

const options = {
  providers,
  callbacks,
  pages: {
    error: '/login' // Changing the error redirect page to our custom login page
  }
}

export default (req, res) => NextAuth(req, res, options)