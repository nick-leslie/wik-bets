"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import {GoogleSignInButton} from "@/app/componets/auth/GoogleSignInButton";

export function LoginCard() {
     const { data: session } = useSession()
    if(session) {
        return (
            <div></div>
        )
    } else {
        return (
            <div className={"grid grid-cols-6"}>
                <div className={"col-span-2"}></div>
                <div className={"border col-span-2 border-black bg-gray-300 rounded-2xl p-5"}>
                    <div className={"grid justify-items-center gap-4 grid-cols-1"}>
                        <div>Play Will It KIll</div>
                        <GoogleSignInButton/>
                    </div>
                </div>
                <div className={"col-span-2"}></div>
            </div>
        )
    }
}