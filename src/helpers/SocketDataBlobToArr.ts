export function SocketDataBlobToArr(data:any,bufferCallback:(buffer:Uint8Array)=>void) {
    let reader = new FileReader()
    reader.readAsArrayBuffer(data);
    reader.addEventListener("loadend", function(e)
    {
        if(e.target != null && e.target.result != null) {
            // @ts-ignore
            let buffer = new Uint8Array(e.target.result);  // arraybuffer object
            bufferCallback(buffer)
        }
    })
}