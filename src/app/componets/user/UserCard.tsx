"use client"
import {useSession} from "next-auth/react";
import {useContext, useEffect, useState} from "react";
import {User} from "@/db/types";
import {PointDisplay} from "@/app/componets/points/PointDisplay";
import {UserContext} from "@/app/componets/user/userContext";

export function UserCard() {
    const user = useContext(UserContext);
    if(user != undefined) {
        return (
            <div className={"pl-16 pr-16 pt-10 pb-10 border-2 rounded w-fit text-white"}>
                <div className={"flex flex-col gap-3"}>
                    <div className={"flex flex-row gap-3"}>
                        <h1>{user.userName}</h1>
                        <div>TODO add profile pic ONLY google</div>
                    </div>
                    <div>
                        <h1>{user.points}</h1>
                        <PointDisplay points={user.points} countSpeed={5} intialDelay={100}
                                      initialPoints={user.points}></PointDisplay>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                loading
            </div>
        )
    }
}