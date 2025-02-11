import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db"; // Prisma Client
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide both email & password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        let existingUser = await prisma.user.findFirst({
          where: { email: user.email as string },
        });

        if (!existingUser) {
          existingUser = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name!,
              image: user.image!,
              role: "USER", // ✅ กำหนด Role เป็น USER
              accounts: {
                create: {
                  provider: "google",
                  providerAccountId: account.providerAccountId,
                  type: "oauth",
                },
              },
            },
          });
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token?.sub) {
        const user = await prisma.user.findUnique({
          where: { id: token.sub },
        });
    
        if (user) {
          session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role || "USER", // ✅ ให้ Role เป็น "USER" ถ้าไม่มีค่า
          };
        } 
      }
      return session;
    }
    
  },
  secret: process.env.NEXTAUTH_SECRET,

  // ✅ ปิด Edge Runtime
  trustHost: true,
});
