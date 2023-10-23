import {load} from "protobufjs";

export function createWikMessage(cmd:number,player:{username:string,isAdmin:boolean} | undefined,bet:{points:number,vote:boolean} | undefined,callback:(payload:Uint8Array) => void) {
    load("./wik.proto",(error,root) => {
        if(root != undefined) {
            let wikMessage = root.lookupType("wik.ws_message")
            let message = {
                cmd: cmd,
                player: player,
                bet:bet,

            }
            let err = wikMessage.verify(message);
            let payload = wikMessage.encode(message).finish();
            if (err != null) {
                throw err;
            }
            callback(payload);
        }
    })
}
