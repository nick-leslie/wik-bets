import {StaticImageData} from "next/image";
import {ReactNode} from "react";
import {twMerge} from "tailwind-merge";

export function NotificationElement(props:{className?:string,children:ReactNode,pos:number,color:string}) {
    return(
        <div className={"rounded border-black p-2"} style={{background:props.color}}>
            <div className={props.className}>
                {props.children}
            </div>
        </div>
    )
}