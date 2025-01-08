import NextAuth, { Session, User } from "next-auth";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { prisma } from "@/libs/prisma";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
        } & DefaultSession["user"]
    }
   
    interface User {
        id: string;
        email: string;
        name: string;
        role: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: string;
    }
}

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'user@gee.com' },
                password: { label: 'Password', type: 'password', placeholder: '******' }
            },
            async authorize(credentials, req) {
                const userFound = await prisma.user.findUnique({
                    where: { email: credentials?.email }
                });
       
                if (!userFound) return null;
       
                if (credentials) {
                    const matchPassword = await bcrypt.compare(credentials.password, userFound.password);
                    if (!matchPassword) return null;
                    return {
                        id: userFound.id,
                        name: userFound.name,
                        email: userFound.email,
                        role: userFound.role
                    };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: '/',
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user: User | null }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };