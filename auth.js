import axios from "axios";
import NextAuth from "next-auth"
import { signInSchema } from "./lib/zod";
import Credentials from "next-auth/providers/credentials"
import { ZodError } from "zod";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        name: 'credentials',
        credentials: {
            email: {},
            password: {},
          },
        authorize: async (credentials) => {
            try {
                const { email, password } = await signInSchema.parseAsync(credentials);
                const data = {email, password}
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accounts/token/`,data)
        
                const user = response.data;
        
                if (!user) {
                // No user found, so this is their first attempt to login
                // Optionally, this is also the place you could do a user registration
                throw new Error("Invalid credentials.")
                }
        
                // return user object with their profile data
                return user
            } catch (error) {
                if (error instanceof ZodError) {
                    // Return `null` to indicate that the credentials are invalid
                    return null
                  }
            }
        },
                
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
})