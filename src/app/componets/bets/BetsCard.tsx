"use client"
import noRock from '@/pictures/noRock.png'
import yesRock from '@/pictures/yesRock.png'
import {BetButton} from "@/app/componets/bets/BetButton";
import {BetsBar} from "@/app/componets/bets/BetsBar";
import {ReactNode, useContext, useEffect, useState} from "react";
import {load} from "protobufjs";
import {UserContext} from "@/app/componets/user/userContext";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {NotificationEventContext} from "@/app/componets/popup/notification/NotificationManager";
import {NotificationPayload} from "@/app/componets/popup/notification/NotificationEvent";
import {ErrorNotification} from "@/app/componets/popup/notification/notifIntTemplate/ErrorNotification";
import {SuccessNotif} from "@/app/componets/popup/notification/notifIntTemplate/SuccessNotif";
export function BetsCard() {
    const isBrowser = typeof window !== "undefined";
    let [points,setPoints] = useState(0)
    let [webSocket,setWebSocket] = useState<WebSocket | null>(null);
    let user = useContext(UserContext);
    let notifEventBus = useContext(NotificationEventContext)

    useEffect(() => {
        if(isBrowser && webSocket == null) {
            try {
                let url = "ws://" + window.location.host.split(":")[0] + ":3001" + "/ws";
                console.log(url)
                const ws = new WebSocket(url);
                setWebSocket(ws);
            } catch (error) {
                console.log(error)
            }
        }
    },[])
    function onPointUpdate(incomingPoints:number) {
        setPoints(incomingPoints)
    }
    function bet(kill:boolean) {
        load("./wik.proto",(err,root)=> {
            if(err) {
                //TODO figure out how to show error
                console.log(err)
            }
            if(root != undefined && user != undefined) {
                let wikMessage = root.lookupType("wik.ws_message")
                let message = {
                    cmd: 0,
                    player: {
                        username:user.userName
                    },
                    bet: {
                        points: points,
                        kill: kill
                    }
                }
                let err = wikMessage.verify(message);
                let payload = wikMessage.encode(message).finish();
                if(err != null) {
                    notifEventBus.fire("createNotification",{
                        notification: <ErrorNotification text={err} title={"Protobuf err"}/>,
                        color:"red",
                        pos:3,
                        classname:"",
                        lifeTime:2000
                    })
                    console.log(err)
                    return;
                }
                if (webSocket != null) {
                    notifEventBus.fire("createNotification",{
                        notification: <SuccessNotif text={""} title={"Sent bet"}/>,
                        color:"green",
                        pos:3,
                        classname:"",
                        lifeTime:2000
                    })
                    console.log("sending msg")
                    webSocket.send(payload)
                }
            }
        })
    }
    return(
        <div className={"grid grid-cols w-fit gap-10 p-5 border border-white rounded"}>
            <BetsBar onPointChange={onPointUpdate}/>
            <div className={"flex flex-row col-span-2"}>
                <BetButton image={yesRock} alt={"yes bet button"} pointsToBet={points} onClickCallback={() => bet(true)}></BetButton>
                <div className={"px-20"}></div>
                <BetButton image={noRock} alt={"no bet button"} pointsToBet={points} onClickCallback={() => bet(false)}></BetButton>
            </div>
        </div>
    )
}