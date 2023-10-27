"use client"
import {UserLoadingScreen} from "@/app/componets/user/UserLoadingScreen";
import {ConditionalRender} from "@/app/componets/Helpers/ConditionalRender";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "@/app/componets/user/userContext";
import {NotificationEventContext} from "@/app/componets/popup/notification/NotificationManager";
import {createWikMessage} from "@/helpers/createWikMessage";
import {createSuccsesNotifcation} from "@/app/componets/popup/notification/notifIntTemplate/SuccessNotif";
import {createErrorNotif} from "@/app/componets/popup/notification/notifIntTemplate/ErrorNotification";
import {WebsocketContext} from "@/app/componets/Helpers/WebSocketProvider";

export function AdminCard() {
    let user = useContext(UserContext);
    let notifEventBus = useContext(NotificationEventContext);
    let [ready,val,send] = useContext(WebsocketContext)
    let [addedEventListener,setAddedEventListener] = useState(false);
   // console.log("triggering add event")
    function createClip() {
        if (user != undefined) {
            let admin = user.isAdmin != 0
            try {
                createWikMessage(3, {username: user.userName, isAdmin: admin}, undefined, (payload) => {
                    if (ready) {
                            createSuccsesNotifcation(notifEventBus, "created clip", "")
                            if(send != undefined) {
                                send(payload)
                            }
                    } else {
                        createErrorNotif(notifEventBus, "no websocket", "web socket connection is null")
                    }
                })
            } catch (error) {
                createErrorNotif(notifEventBus, "proto buff err", error as string)
            }
        }
    }

    return (
        <div className={"grid grid-cols w-fit gap-10 p-5 border border-white rounded"}>
            <ConditionalRender condition={user != undefined} fallback={<UserLoadingScreen/>}>
                <button className={"text-white"} onClick={() => createClip()}>create clip</button>
            </ConditionalRender>
        </div>
    )
}