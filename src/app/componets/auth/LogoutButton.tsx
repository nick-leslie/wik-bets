'use client'
import {signOut} from "next-auth/react";

export function LogoutButton() {
    return(
        <button className={"text-white"} onClick={async () => {await signOut()}}>
            logout
        </button>
    )
}