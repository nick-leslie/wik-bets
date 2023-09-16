import NextAuth, {NextAuthOptions} from 'next-auth'
import Google from 'next-auth/providers/google'

export const authOptions:NextAuthOptions = {
    providers: [
        Google({
            // @ts-ignore
            clientId:process.env.GOOGLE_ID,
            // @ts-ignore
            clientSecret:process.env.GOOGLE_SECRET,
            profile(profile) {
                return {
                    id:profile.sub,
                    name: profile.name,
                    email: profile.email
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return "/unauthorized";
        },
    },
    pages: {
        signIn: '/login'
    }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}