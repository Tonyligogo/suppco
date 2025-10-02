import NextAuth from "next-auth";
import { signInSchema } from "./lib/zodSchemas";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize (credentials) {
        if (credentials === null) return null;
        try {
          const validated = signInSchema.safeParse(credentials);
          if (validated.success) {
            const { email, password } = validated.data;
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/login/`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
              }
            );
            if (!response.ok) {
              const errorData = await response.json();
              console.error("Backend Auth Failed:", errorData.detail || "Unknown error");
              return null;
          }
            const user = await response.json();

            if (!user) {
              throw new Error("Invalid credentials.");
            }
            return user;
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
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
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
});
