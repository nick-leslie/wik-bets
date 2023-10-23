import {createWikMessage} from "@/helpers/createWikMessage";
import {createSuccsesNotifcation, SuccessNotif} from "@/app/componets/popup/notification/notifIntTemplate/SuccessNotif";
import {createErrorNotif} from "@/app/componets/popup/notification/notifIntTemplate/ErrorNotification";
import {DefaultEventBus} from "@/eventBus/EventBus";
import {User} from "@/db/types";

export function sendBet(user:User,webSocket: WebSocket | null,notifEventBus:DefaultEventBus,points:number,vote:boolean) {
    let admin = user.isAdmin != 0
    try {
        createWikMessage(1, {username: user.userName, isAdmin: admin}, {points: points, vote: vote}, (payload) => {
            if (webSocket != null) {
                if (webSocket.readyState != webSocket.CLOSED) {
                    createSuccsesNotifcation(notifEventBus, "sent bet", "")
                    webSocket.send(payload)
                } else {
                    createErrorNotif(notifEventBus, "no websocket", "web socket connection is closed")
                }
            } else {
                createErrorNotif(notifEventBus, "no websocket", "web socket connection is null")
            }
        })
    } catch (error) {
        createErrorNotif(notifEventBus, "proto buff err", error as string)
    }
}