"use client"
import {Context, createContext, ReactNode, useContext, useState} from "react";
import {DefaultEventBus} from "@/eventBus/EventBus";
import {NotificationEvent} from "@/app/componets/popup/notification/NotificationEvent";
import {NotificationBody} from "@/app/componets/popup/notification/NotificationBody";
import {NotificationElement} from "@/app/componets/popup/notification/NotificationElement";
import {User} from "@/db/types";
import {twMerge} from "tailwind-merge";
export let NotificationEventContext:Context<DefaultEventBus>= createContext<DefaultEventBus>( new DefaultEventBus())

export function NotificationManager(props:{children:ReactNode}) {
    let notificationBus = new DefaultEventBus();
    let [notificationList,setNotificationList] = useState<ReactNode[][]>([[],[],[],[]]);
    let notifEvent = new NotificationEvent();
    notificationBus.events.set("createNotification",notifEvent);
    notifEvent.subscriptions.push((notif) => {
        //TODO setup a system to
        let newList = notificationList;
        console.log("test")
        newList[notif.pos].push(
            <NotificationElement className={notif.classname} color={notif.color} pos={notif.pos}>
                {notif.notification}
            </NotificationElement>
        )
        setTimeout(() => {
            let newList = notificationList;
             newList[notif.pos].shift();
             setNotificationList([...newList])
        },notif.lifeTime)
        setNotificationList([...newList])
    });
    //TODO have a bunch of containers on each norners
    return(
        <NotificationEventContext.Provider value={notificationBus}>
            <div className={"relative w-full h-full"}>
                {props.children}
                {
                    notificationList.map((notifPosList,index) => {
                    let posClass = "bottom-5 right-5"
                    switch (index) {
                        case 0:
                            posClass = "left-5 top-5"
                            break;
                        case 1:
                            posClass = "right-5 top-5";
                            break;
                        case 2:
                            posClass = "left-5 bottom-5";
                            break;
                        case 3:
                            posClass = "right-5 bottom-5";
                            break;
                    }
                    return (<div className={twMerge("absolute flex flex-col gap-5",posClass)} key={"notification list pos" + index}>
                        {notifPosList.map((notif) => {
                            return notif;
                        })}
                    </div>)
                })}
            </div>
        </NotificationEventContext.Provider>
    )
}