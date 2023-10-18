"use client"

import {Context, createContext, ReactNode, useEffect, useState} from "react";
import {User} from "@/db/types";
import {useSession} from "next-auth/react";

export let UserContext:Context<User|undefined>= createContext<User|undefined>(undefined)

export function UserContextProvider(props:{children:ReactNode}) {
    let session = useSession();
    let [user,setUser] = useState<User | undefined>(undefined);
    useEffect(() => {
        async function getData() {
            let email = session.data?.user?.email;
            if (email != null || email != email) {
                let userDataResponce = await fetch("/api/user", {
                    method: "POST",
                    body: JSON.stringify({
                        email: email
                    })
                });
                let user:User = await userDataResponce.json()
                console.log(user)
                setUser(user);
            } else {
                //TODO error notification
            }
        }
        getData().finally();
    },[])
    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    )
}