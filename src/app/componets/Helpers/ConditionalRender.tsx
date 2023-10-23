"use client"
import {ReactNode} from "react";

export function ConditionalRender(props:{condition:boolean,children:ReactNode,fallback:ReactNode}) {
    if(props.condition) {
        return(
            <>
                {props.children}
            </>
        )
    } else {
        return(
            <>
                {props.fallback}
            </>
        )
    }
}