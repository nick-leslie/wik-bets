export interface EventBus {
    events: Map<string,EventBusEvent<any>>
    fire:(name:string,data:any) => void
}
export class DefaultEventBus implements EventBus {
    events: Map<string, EventBusEvent<any>>;
    constructor() {
        this.events = new Map<string,EventBusEvent<any>>;
    }

    fire(name: string, data: Payload): void {
        let eventBusEvent = this.events.get(name);
        if(eventBusEvent != undefined) {
            eventBusEvent.fire(data)
        }
    }

}
export interface Payload {}
export interface EventBusEvent<T extends Payload> {
    subscriptions: {
        (data: T): void
    }[]
    fire:(data:T) => void
}