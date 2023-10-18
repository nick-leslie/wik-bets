"use client"
import React, {useEffect, useState} from "react";


export function PointDisplay(props:{initialPoints:number,points?:number,countSpeed:number,intialDelay:number}) {
    let [points,setPoints] = useState(props.initialPoints);
    let [displayPoints,setDisplayPoints] = useState(props.initialPoints);
    useEffect(() => {
        setPoints(props.points ? props.points : 0)
    }, [props.points]);
    useEffect(() => {
        //TODO make this better
        //TODO candle past time outs
        if(points > displayPoints) {
            for (let i = 0; i < points - displayPoints; i++) {
                setTimeout(() => {
                    setDisplayPoints(displayPoints += 1);
                }, props.intialDelay + (i * props.countSpeed));
            }
        } else {
            for (let i = 0; i < displayPoints - points; i++) {
                setTimeout(() => {
                    setDisplayPoints(displayPoints -= 1);
                }, props.intialDelay + (i * props.countSpeed));
            }
        }
    }, [points]);
    return(
        <div className={"flex flex-row relative"}>
            {numberToStringArray(displayPoints).map((num) => {
                return(<div className={"border-2 bg-stone-500 pl-1 pr-1 w-fit h-fit relative"} key={"points" + num + Math.random()}>
                    <h1 className={"text-4xl text-white"}>
                        {num}
                    </h1>
                </div>)
            })}
        </div>
    )
}

    function numberToStringArray(num:number) {
        return num.toString().split("")
    }