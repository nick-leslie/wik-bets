import Image, {StaticImageData} from "next/image";

export function BetButton(props:{image:StaticImageData,alt:string,pointsToBet:number,onClickCallback?:()=>void}) {
    return(
        <div onClick={props.onClickCallback}>
            <Image src={props.image} alt={props.alt}></Image>
        </div>
    )
}