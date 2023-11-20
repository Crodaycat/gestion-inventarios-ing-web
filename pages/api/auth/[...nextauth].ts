import prisma from '@/service/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

export const AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  callbacks: {
    session: async ({ session, user }: any) => {
      const userRole = await prisma.role.findUnique({
        where: { id: user?.roleId || '' },
      });

      return { ...session, user: { ...user, role: userRole?.name } };
    },
  },
};

export default NextAuth(AuthOptions);
