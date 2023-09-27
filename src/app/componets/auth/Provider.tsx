'use client'

import {SessionProvider} from "next-auth/react";
import React from "react";

export default function Provider(props:{ children?:React.ReactNode} ) {
    return (
        <SessionProvider>{props.children}</SessionProvider>
    )
}
