"use client"
import noRock from '@/pictures/noRock.png'
import yesRock from '@/pictures/yesRock.png'
import {BetButton} from "@/app/componets/bets/BetButton";
import {BetsBar} from "@/app/componets/bets/BetsBar";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "@/app/componets/user/userContext";
import {NotificationEventContext} from "@/app/componets/popup/notification/NotificationManager";
import {createErrorNotif} from "@/app/componets/popup/notification/notifIntTemplate/ErrorNotification";
import {createSuccsesNotifcation} from "@/app/componets/popup/notification/notifIntTemplate/SuccessNotif";
import {createWikMessage} from "@/helpers/createWikMessage";
import {ConditionalRender} from "@/app/componets/Helpers/ConditionalRender";
import {UserLoadingScreen} from "@/app/componets/user/UserLoadingScreen";
import {WaitingForClip} from "@/app/componets/bets/WaitingForClip";
import {WebsocketContext} from "@/app/componets/Helpers/WebSocketProvider";

//TODO make it so that the bets card only apperes when the server sends the create clip command

//TODO break websoecet into a websocekt componetbar

export function BetsCard() {
    let [points,setPoints] = useState(0)
    let [clipReady,setClipReady] = useState(false)
    let [addedEventListener,setAddedEventListener] = useState(false);
    let user = useContext(UserContext);
    let [ready,msg,send] = useContext(WebsocketContext);
    let notifEventBus = useContext(NotificationEventContext)
    useEffect(() => {
        if(msg != null) {
            if(msg.cmd === "CREATE_CLIP") {
                setClipReady(true);
            } else if(msg.cmd === "PAYOUT") {
                setClipReady(false);
            }
        }
    },[msg])

    //TODO solve the fact that we have to wait for a second message for us to get it

    function onPointUpdate(incomingPoints:number) {
        setPoints(incomingPoints)
    }
    function bet(vote:boolean) {
        if (user != undefined) {
            let admin = user.isAdmin != 0
            try {
                createWikMessage(1, {username: user.userName, isAdmin: admin}, {points: points, vote: vote}, (payload) => {
                    if(ready) {
                        if (send != undefined) {
                            createSuccsesNotifcation(notifEventBus, "sent bet", "")
                            send(payload)
                        } else {
                            createErrorNotif(notifEventBus, "web socket err", "cant send")
                        }
                    } else {
                        createErrorNotif(notifEventBus, "web socket err", "web socket not ready")
                    }
                })
            } catch (error) {
                createErrorNotif(notifEventBus, "proto buff err", error as string)
            }
        }
    }
    return(
        <div className={"grid grid-cols w-fit gap-10 p-5 border border-white rounded"}>
            <ConditionalRender condition={user != undefined} fallback={<UserLoadingScreen/>}>
                <ConditionalRender condition={clipReady} fallback={<WaitingForClip/>}>
                    <BetsBar onPointChange={onPointUpdate}/>
                    <div className={"flex flex-row col-span-2"}>
                        <BetButton image={yesRock} alt={"yes bet button"} pointsToBet={points} onClickCallback={() => bet(true)}></BetButton>
                        <div className={"px-20"}></div>
                        <BetButton image={noRock} alt={"no bet button"} pointsToBet={points} onClickCallback={() => bet(false)}></BetButton>
                    </div>
                </ConditionalRender>
            </ConditionalRender>
        </div>
    )
}

