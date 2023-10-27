"use client"
import {createContext, ReactNode, useContext, useEffect, useRef, useState} from "react";
import {loadWikMessage, wik_message} from "@/helpers/loadWikMessage";
import {SocketDataBlobToArr} from "@/helpers/SocketDataBlobToArr";
import {createWikMessage} from "@/helpers/createWikMessage";
import {SuccessNotif} from "@/app/componets/popup/notification/notifIntTemplate/SuccessNotif";
import {createErrorNotif} from "@/app/componets/popup/notification/notifIntTemplate/ErrorNotification";
import {NotificationEventContext} from "@/app/componets/popup/notification/NotificationManager";
import {UserContext} from "@/app/componets/user/userContext";

export const WebsocketContext = createContext<[boolean,wik_message|null,((data:string | Uint8Array | ArrayBufferLike | Blob | ArrayBufferView) => void) | undefined]>([false, null,undefined]);
//                                            ready, value, send

// Make sure to put WebsocketProvider higher up in
// the component tree than any consumers.
export const WebsocketProvider = (props:{url:string,children:ReactNode}) => {
    const [isReady, setIsReady] = useState(false);
    const [hasRegistred, setHasRegistred] = useState(false);
    const [val, setVal] = useState<wik_message | null>(null);
    const ws = useRef<WebSocket | null>(null);
    let notifEventBus = useContext(NotificationEventContext);
    let user = useContext(UserContext);
    useEffect(() => {
        if(user !== undefined && ws.current!==null && !hasRegistred) {
            register()
            setHasRegistred(true)
        }
    },[user])
    useEffect(() => {
        console.log("re ran")
        const socket = new WebSocket(props.url);

        socket.onopen = () => {
            setIsReady(true)
        };
        socket.onclose = () => setIsReady(false);
        socket.onmessage = (event) => {
            SocketDataBlobToArr(event.data,(buffer) => {
                loadWikMessage(buffer, (msg, error) => {
                    setVal(msg);
                });
            });
        }

        ws.current = socket;

        return () => {
            socket.close();
        };
    }, []);

    const ret:[boolean,wik_message | null,((data:string | ArrayBufferLike | Blob | ArrayBufferView) => void) | undefined] = [isReady, val, ws.current?.send.bind(ws.current)];
    function register() {
        if(user != undefined) {
            let admin = user.isAdmin != 0
            createWikMessage(0, {username: user.userName, isAdmin: admin}, undefined, (payload) => {
                if (ws.current != null) {
                    notifEventBus.fire("createNotification", {
                        notification: <SuccessNotif text={""} title={"Registered with server"}/>,
                        color: "green",
                        pos: 3,
                        classname: "",
                        lifeTime: 2000
                    })
                    console.log("registered")
                    console.log(ws.current)
                    let [ready,val,send] = ret
                    if(send !== undefined) {
                        send(payload)
                    }
                } else {
                    createErrorNotif(notifEventBus, "no websocket", "web socket connection is null")
                }
            })
        }
    }
    return (
        <WebsocketContext.Provider value={ret}>
            {props.children}
        </WebsocketContext.Provider>
    );
};


