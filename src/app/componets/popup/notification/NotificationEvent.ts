import {EventBusEvent} from "@/eventBus/EventBus";
import {ReactNode} from "react";
export interface NotificationPayload {
    notification:ReactNode
    color:string,
    pos:number
    classname:string
    lifeTime:number
}

export class NotificationEvent implements EventBusEvent<NotificationPayload>{
    subscriptions: { (data: NotificationPayload): void }[];
    constructor() {
        this.subscriptions = [];
    }

    fire(data:NotificationPayload): void {
        for (let i = 0; i < this.subscriptions.length; i++) {
            this.subscriptions[i](data);
        }
    }
}