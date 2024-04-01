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
        async signIn({ user, account, profile, session }: any) {
            /*if (account.provider === "google") {
                return profile.email_verified
            }*/

            /*const res = await fetch("http://localhost:3001/api/auth/callback/github/signIn", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, account, profile }),
            });

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
