"use client"

import {LoginBoundry} from "@/app/componets/auth/LoginBoundry";
import {UserContextProvider} from "@/app/componets/user/userContext";
import {UserCard} from "@/app/componets/user/UserCard";
import {WebSocketContextProvierOld} from "@/app/componets/Helpers/WebSocketContextOld";
import {BetsCard} from "@/app/componets/bets/BetsCard";
import {AdminCard} from "@/app/componets/admin/adminCard";
import React from "react";
import {WebsocketContext, WebsocketProvider} from "@/app/componets/Helpers/WebSocketProvider";

export function IndexClientCode() {
    return (
        <div>
            <LoginBoundry>
                <UserContextProvider>
                    <div className={"grid grid-cols-3"}>
                        <UserCard/>
                        {window !== undefined ?
                            <WebsocketProvider  url={"ws://" + window.location.host.split(":")[0] + ":3001" + "/ws"}>
                                {/*<WebSocketContextProvierOld url={"ws://" + window.location.host.split(":")[0] + ":3002" + "/ws"}>*/}
                                    <BetsCard/>
                                    <AdminCard/>
                                {/*</WebSocketContextProvierOld>*/}
                            </WebsocketProvider>:
                            <></>
                        }
                    </div>
                </UserContextProvider>
            </LoginBoundry>
        </div>
    )
}