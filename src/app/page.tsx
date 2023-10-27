import Image from 'next/image'
import wikBanner from '@/pictures/wikBanner.png'
import {LogoutButton} from "@/app/componets/auth/LogoutButton";
import {WikStyleBox} from "@/app/componets/wikLogoStuff/WikStyleBox";
import {WikText} from "@/app/componets/wikLogoStuff/WikText";
import React from "react";
import {IndexClientCode} from "@/app/IndexClientCode";
export default function Home() {
    return (
        <>
            <div className={"flex flex-col"} >
                <div className={"grid justify-items-center"}>
                    <Image src={wikBanner} alt={"will it kill chat"}></Image>
                    <WikStyleBox>
                        <WikText text={"WILL IT KILL...?"}></WikText>
                    </WikStyleBox>
                    <LogoutButton></LogoutButton>
                </div>
            </div>
            <IndexClientCode></IndexClientCode>
        </>
    )
}
