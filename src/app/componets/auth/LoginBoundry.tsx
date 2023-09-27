"use client"
import {ReactNode} from "react";
import {useSession} from "next-auth/react";
import {LoginCard} from "@/app/componets/auth/LoginCard";

export function LoginBoundry(props:{children:ReactNode}) {
    let session = useSession();
    if(session.status != "authenticated") {
        return (
            <LoginCard></LoginCard>
        )
    }
    return (
        <>
            {props.children}
        </>
    )
}