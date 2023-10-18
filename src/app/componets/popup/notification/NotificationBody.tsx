import {StaticImageData} from "next/image";
import {ReactNode} from "react";
import {twMerge} from "tailwind-merge";

export function NotificationBody(props:{className?:string,icon?:ReactNode,title:string,text:string}) {
    return(
        <div className={twMerge("flex flex-row",props.className)}>
            {props.icon}
            <div className={"flex flex-col"}>
                <div>{props.title}</div>
                <div>{props.text}</div>
            </div>
        </div>
    )
}