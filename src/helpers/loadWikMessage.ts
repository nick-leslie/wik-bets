import {load, Reader} from "protobufjs";
import {createErrorNotif} from "@/app/componets/popup/notification/notifIntTemplate/ErrorNotification";
export enum command {

    REGISTER,
    BET,
    QUIT,
    CREATE_CLIP,
    PAYOUT,
}

export type wik_message = {
    cmd:"REGISTER" | "BET" | "QUIT" | "CREATE_CLIP" | "PAYOUT",
    player?:{username:string,isAdmin:boolean}
    bet?:{points:number,vote:boolean}
}


export function loadWikMessage(buffer:Reader | Uint8Array, callback:(msg:wik_message | null,error:string | null) => void) {
    load("./wik.proto", (error, root) => {
        if(error != null) {
            callback(null,error.message)
        }
        if(root != undefined) {
            let wikMessage = root.lookupType("wik.ws_message")
            let decodedMessage = wikMessage.decode(buffer);
            console.log(decodedMessage)
            let decode:wik_message = <wik_message>decodedMessage.toJSON();
            callback(decode,null);
        } else {
            callback(null,"root is undefined");
        }
    })
}