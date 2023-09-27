"use client"
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {User} from "@/db/types";

export function UserCard() {
    let session = useSession();
    let [user,setUser] = useState<User | null>(null);
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
                let user = await userDataResponce.json()
                console.log(user)
                setUser(user);
            }
        }
        getData().finally();
    },[])
    return (
            <div className={"pl-16 pr-16 pt-10 pb-10 border-2 rounded w-fit text-white"}>
                <div className={"flex flex-col gap-3"}>
                    <div className={"flex flex-row gap-3"}>
                        <h1>{user?.userName}</h1>
                        <div>TODO add profile pic ONLY google</div>
                    </div>
                    <div>
                        points: {user?.points}
                    </div>
                </div>
            </div>
    )
}