export function WikText(props:{text:string}) {
    return(
        <div className={"relative"}>
            <h1 className={"text-white text-4xl shadow-red-900 text-shadow-xl font-bold static"}>
                {props.text}
            </h1>
        </div>
    )
}