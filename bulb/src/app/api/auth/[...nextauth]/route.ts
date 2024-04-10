import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID ?? "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    callbacks: {
        async signOut({ token, session }: any) {
            token = {};
            session = {};

            return {}
        },
        async signIn({ user, account, profile }: any) {
            /*if (account.provider === "google") {
                return profile.email_verified
            }*/

            console.log('SIGN IN', profile);

            const res = await fetch("http://localhost:3001/auth/callback/google/signIn", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${account.accessToken}` 
                },
                body: JSON.stringify({
                    email: profile.email,
                    id: user.id,
                    name: user.name
                })
            });
            
            console.log('SIGN IN', res);

            /*
            const data = await res.json();

            console.log('SIGN IN', data);

            if (data.success) {

                return true;
            } else {
                return false;
            }*/

            return true;
        }
    },
    pages: {
        signIn: "/auth/signIn",
    }
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
