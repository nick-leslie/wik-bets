import Image from 'next/image'
import wikBanner from '@/pictures/wikBanner.png'
import {LoginCard} from "@/app/componets/auth/LoginCard";
import {signOut} from "next-auth/react";
import {LogoutButton} from "@/app/componets/auth/LogoutButton";
import {LoginBoundry} from "@/app/componets/auth/LoginBoundry";
import {UserCard} from "@/app/componets/user/UserCard";
import {WikStyleBox} from "@/app/componets/wikLogoStuff/WikStyleBox";
import {WikText} from "@/app/componets/wikLogoStuff/WikText";
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
                    <UserCard></UserCard>
                </div>
            </LoginBoundry>
        </>
    )
}
