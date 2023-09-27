import {ReactNode} from "react";

export function WikStyleBox(props:{children?:ReactNode}) {
    return(

        <div className={"border-4 border-white shadow-lg shadow-red-900"}>
            <div className={"pt-2 pb-2 pl-3 pr-3 shadow-inner shadow-red-900"}
            style={{boxShadow: "inset 0 0 14px #f80000"}}>
                    {props.children}
            </div>
        </div>
    )
}