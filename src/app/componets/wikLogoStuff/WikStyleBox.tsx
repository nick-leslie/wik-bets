import {ReactNode} from "react";
import {twMerge} from "tailwind-merge";

export function WikStyleBox(props:{children?:ReactNode,className?:string}) {
    return(

        <div className={"border-4 border-white shadow-lg shadow-red-900"}>
            <div className={twMerge("pt-2 pb-2 pl-3 pr-3 shadow-inner shadow-red-900",props.className)}
            style={{boxShadow: "inset 0 0 14px #f80000"}}>
                    {props.children}
            </div>
        </div>
    )
}