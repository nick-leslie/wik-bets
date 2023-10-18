import NextAuth, {NextAuthOptions} from 'next-auth'
import Google from 'next-auth/providers/google'
import { db } from '@/db/database'
import {DB, User} from "@/db/types";
import { uniqueNamesGenerator, Config, colors, animals } from 'unique-names-generator';
const customConfig: Config = {
    dictionaries: [colors,animals],
    separator: '-',
    length: 2,
};
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
            console.log(user)
            if(user.email != undefined) {
                let DbUser = await db.selectFrom("User").selectAll().where('email','=',user.email).executeTakeFirst();
                console.log(DbUser)
                if(DbUser == undefined) {
                    let newUser = await db.insertInto("User").values({
                        email: user.email,
                        userName:uniqueNamesGenerator(customConfig),
                        points: 8000
                    }).executeTakeFirst();
                    console.log(newUser);
                }
            }
            return true
        },
    },
    pages: {
        signIn: '/login'
    }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}