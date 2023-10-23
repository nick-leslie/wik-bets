import {load, Reader} from "protobufjs";
import {createErrorNotif} from "@/app/componets/popup/notification/notifIntTemplate/ErrorNotification";
enum command {
    REGISTER,
    BET,
    QUIT,
    CREATE_CLIP,
    PAYOUT,
}

export type wik_message = {
    command:command,
    player?:{username:string,isAdmin:boolean}
    bet?:{points:number,vote:boolean}
}


export function loadWikMessage(buffer:Reader | Uint8Array, callback:(msg:wik_message | undefined,error:string | null) => void) {
    load("./wik.proto", (error, root) => {
        if(error != null) {
            callback(undefined,error.message)
        }
        if(root != undefined) {
            let wikMessage = root.lookupType("wik.ws_message")
            let decodedMessage = wikMessage.decode(buffer);
            console.log(decodedMessage)
            let decode:wik_message = <wik_message>decodedMessage.toJSON();
            callback(decode,null);
        } else {
            callback(undefined,"root is undefined");
        }
    })
}