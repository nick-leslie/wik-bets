"use client"
import {Context, createContext, ReactNode, useContext, useEffect, useState} from "react";
import {createErrorNotif} from "@/app/componets/popup/notification/notifIntTemplate/ErrorNotification";
import {loadWikMessage} from "@/helpers/loadWikMessage";
import {NotificationEventContext} from "@/app/componets/popup/notification/NotificationManager";
import {createWikMessage} from "@/helpers/createWikMessage";
import {SuccessNotif} from "@/app/componets/popup/notification/notifIntTemplate/SuccessNotif";
import {UserContext} from "@/app/componets/user/userContext";
import {EventBusEvent} from "@/eventBus/EventBus";
import {NotificationPayload} from "@/app/componets/popup/notification/NotificationEvent";
interface websocketCon {
    websocket:WebSocket,
    hasRegistered:false
}


export let WebSocketContextOld: Context<websocketCon> = createContext<websocketCon>({websocket:null,hasRegistered:false});

//"ws://" + window.location.host.split(":")[0] + ":3001" + "/ws";
export function WebSocketContextProvierOld(props:{url:string,children:ReactNode}) {
    const isBrowser = typeof window !== "undefined";
    let [webSocket,setWebSocket] = useState<WebSocket | null>(null);
    let [hasRegistered,setHasRegistered] = useState(false);
    let notifEventBus = useContext(NotificationEventContext);
    let user = useContext(UserContext);
    useEffect(() => {
        if(isBrowser && webSocket == null) {
            try {
                console.log("creating websocet")
                const ws = new WebSocket(props.url);
                ws.binaryType = "blob"
                ws.onerror = (event) => {
                    createErrorNotif(notifEventBus,"web socket error",event.type)
                }
                ws.addEventListener('message',(event) => {
                    console.log("got message");
                    notifEventBus.fire("wsMessage",{event:event})
                })
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
    return (
        <WebSocketContextOld.Provider value={{websocket:webSocket,hasRegistered:hasRegistered}}>
            {webSocket !== null ?
                props.children : <></>}
        </WebSocketContextOld.Provider>
    )
}