import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    secret: process.env.JWT_SECRET as string,
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }: any)  {
            if (account?.id_token) {
                token.id_token = account.id_token;
            }

            console.log(user, account, profile, isNewUser);

            return token;
        },
        async session({ session, user, token }: any) {

            return session;
        },
        async signIn({ user, account, profile, email, credentials }: any) {
            
            
            return true
        }
    },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
