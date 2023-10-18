import Image from 'next/image'
import wikBanner from '@/pictures/wikBanner.png'
import {LogoutButton} from "@/app/componets/auth/LogoutButton";
import {LoginBoundry} from "@/app/componets/auth/LoginBoundry";
import {UserCard} from "@/app/componets/user/UserCard";
import {WikStyleBox} from "@/app/componets/wikLogoStuff/WikStyleBox";
import {WikText} from "@/app/componets/wikLogoStuff/WikText";
import {BetsCard} from "@/app/componets/bets/BetsCard";
import React from "react";
import {UserContextProvider} from "@/app/componets/user/userContext";
import {NotificationManager} from "@/app/componets/popup/notification/NotificationManager";
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
                    <LoginBoundry>
                        <div>
                            <UserContextProvider>
                                <UserCard></UserCard>
                                <BetsCard></BetsCard>
                            </UserContextProvider>
                        </div>
                </LoginBoundry>
        </>
    )
}
