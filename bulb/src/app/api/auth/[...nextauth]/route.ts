import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";



export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile  }: any) {
            console.log("User signed in", user, account, profile);

            const res = await fetch("http://localhost:3001/auth/callback/google/signUp", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${account.id_token}` 
                },
                body: JSON.stringify(user),
            });
            

            if (!res.ok) {
                console.error('Error with sign in response:', res.statusText);
                return false;
            }

            /*if (!dbUser?.data?.user) return false

            */

            //console.log("User signed in", dbUser);

            return true;
        },
        
    },
};


/*async jwt({ token, user, trigger, session }: any) {
if (trigger === "update") {
    return {
        ...token,
        ...session.user,
    };
}

/*const isTokenExpired =
    token.accessTokenExp &&
    checkTokenExpiry(token.accessTokenExp as number);

const isRefreshTokenExpired =
    token.refreshTokenExp &&
    checkTokenExpiry(token.refreshTokenExp as number);

if (token.refreshTokenExp && isRefreshTokenExpired) {
    return {
    ...token,
    error: "refresh-token-expired",
    };
}

if (isTokenExpired) {
    const newTokens = await refreshToken(token.refreshToken as string);

    token.accessToken = newTokens.accessToken;
    token.accessTokenExp = newTokens.expiresIn;
    token.refreshTokenExp = newTokens.expiresIn;

    return {
    ...token,
    ...user,
    };
}

return { ...token, ...user };
},
async session({ token, session }: any) {
session.user = token as any;

return session;
}*/

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
