import Image from 'next/image'
import wikBanner from '@/pictures/wikBanner.png'
export default function Home() {
  return (
      <div>
        <div className={"grid justify-items-center"}>
            <Image src={wikBanner} alt={"will it kill chat"}></Image>
        </div>

      </div>
  )
}
