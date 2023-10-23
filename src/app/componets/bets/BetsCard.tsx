"use client"
import noRock from '@/pictures/noRock.png'
import yesRock from '@/pictures/yesRock.png'
import {BetButton} from "@/app/componets/bets/BetButton";
import {BetsBar} from "@/app/componets/bets/BetsBar";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "@/app/componets/user/userContext";
import {NotificationEventContext} from "@/app/componets/popup/notification/NotificationManager";
import {createErrorNotif} from "@/app/componets/popup/notification/notifIntTemplate/ErrorNotification";
import {SuccessNotif} from "@/app/componets/popup/notification/notifIntTemplate/SuccessNotif";
import {createWikMessage} from "@/helpers/createWikMessage";
import {sendBet} from "@/app/componets/bets/bet";
import {load} from "protobufjs";
import {loadWikMessage} from "@/helpers/loadWikMessage";
import {ConditionalRender} from "@/app/componets/Helpers/ConditionalRender";
import {UserLoadingScreen} from "@/app/componets/user/UserLoadingScreen";
import {WaitingForClip} from "@/app/componets/bets/WaitingForClip";

//TODO make it so that the bets card only apperes when the server sends the create clip command


export function BetsCard() {
    const isBrowser = typeof window !== "undefined";
    let [points,setPoints] = useState(0)
    let [webSocket,setWebSocket] = useState<WebSocket | null>(null);
    let [hasRegistered,setHasRegistered] = useState(false);
    let [clipReady,setClipReady] = useState(false)
    let user = useContext(UserContext);
    let notifEventBus = useContext(NotificationEventContext)

    useEffect(() => {
        if(isBrowser && webSocket == null) {
            try {
                let url = "ws://" + window.location.host.split(":")[0] + ":3001" + "/ws";
                const ws = new WebSocket(url);
                ws.binaryType = "blob"
                ws.onerror = (event) => {
                    createErrorNotif(notifEventBus,"web socket error",event.type)
                }
                ws.onmessage = (event) => {
                    SocketDataBlobToArr(event.data,(buffer) => {
                        loadWikMessage(buffer,(msg,error) => {
                            if(error != null) {
                                createErrorNotif(notifEventBus,"protobuff",error);
                                if(msg != undefined) {
                                    console.log(msg)
                                }
                            }
                        })
                    })
                }
                setWebSocket(ws);
            } catch (error) {
                createErrorNotif(notifEventBus,"web socket error","failed to create websocket")
            }
            try {
            } catch (error) {
                createErrorNotif(notifEventBus,"proto buff err",error as string)
            }
        }
    },[])

    useEffect(() => {
        if(user != undefined && hasRegistered == false) {
            if(!hasRegistered) {
                console.log("registering")
                let admin = user.isAdmin != 0
                createWikMessage(0, {username: user.userName,isAdmin:admin}, undefined, (payload) => {
                    if (webSocket != null) {
                        notifEventBus.fire("createNotification", {
                            notification: <SuccessNotif text={""} title={"Registered with server"}/>,
                            color: "green",
                            pos: 3,
                            classname: "",
                            lifeTime: 2000
                        })
                        console.log("registered")
                        webSocket.send(payload)
                        setHasRegistered(true);
                    } else {
                        createErrorNotif(notifEventBus,"no websocket","web socket connection is null")
                    }
                })
            }
        }
    },[user])
    function onPointUpdate(incomingPoints:number) {
        setPoints(incomingPoints)
    }
    function bet(kill:boolean) {
        if (user != undefined) {
            sendBet(user,webSocket,notifEventBus,points,kill);
        }
    }
    //TODO add loading ui for until we have player and for until we have a clip
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

