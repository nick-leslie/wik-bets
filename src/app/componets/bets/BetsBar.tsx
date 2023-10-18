"use client"
import {WikStyleBox} from "@/app/componets/wikLogoStuff/WikStyleBox";
import {PointDisplay} from "@/app/componets/points/PointDisplay";
import React, {useContext, useState} from "react";
import {UserContext} from "@/app/componets/user/userContext";

export function BetsBar(props:{onPointChange?:(points:number) => void}) {
    let user = useContext(UserContext)
    let [points,setPoints] = useState(0);
    function onUpdate(e: React.ChangeEvent<HTMLInputElement>) {
        let points= parseInt(e.target.value);
        setPoints(points);
        if(props.onPointChange != undefined) {
            props.onPointChange(points)
        }
    }
    return(
        <div className={"grid grid-cols-2 justify-items-center gap-y-10"}>
            <div className={"col-span-2"}>
                <WikStyleBox className={"grid justify-items-center"}>
                    <div className={"text-white"}>
                        Total bet
                    </div>
                </WikStyleBox>
            </div>
            <div className={"relative"}>
                <PointDisplay countSpeed={1} initialPoints={0} points={points} intialDelay={100}></PointDisplay>
                <input className={"opacity-0 absolute top-0 left-0 w-full h-full"} type="text" pattern="[0-9]*" onInput={onUpdate}/>
            </div>
            <div>
                <WikStyleBox className={"grid justify-items-center"}>
                       <div className={"text-white"}>
                           Throwing Rock
                       </div>
                </WikStyleBox>
            </div>
    </div>
    )
}