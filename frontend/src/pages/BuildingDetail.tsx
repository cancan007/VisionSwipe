import '../detail.css'
import house from "../assets/house.png"
import { FadeIn } from '../animations/FadeIn'

export const BuildingDetail = ()=>{

    return(
        <body>
            <header className="building-detail-header">
                <p className="text-5xl pt-5 pl-10 fadeIn">Building detail</p>
            </header>
            <section className="flex flex-col items-center ">
                <FadeIn>
              <div className="flex flex-row justify-between w-full mt-20">
                
                <img className="w-3/5 pl-10" src={house}/>
                <div className="building-info-section flex flex-col items-center justify-center w-full">
                  <p>Company: Thoroubghbred Inc</p>
                  <p>会社名：株式会社サラブレッド</p>
                  <p>Company URL: <a className="text-blue-300 hover:text-blue-500" href='https://tb-one.net/'>https://tb-one.net/</a> </p>
                  <p className='mt-5'>Building name: Hotel Kakurega in Narita</p>
                  <p>建物名：成田ホテル　隠れ家</p>
                  <p>Address: 982-1, Saiwai-cho, Narita-shi, Chiba-ken</p>
                  <p>住所：千葉県成田市幸町982-1</p>
                  <p>Price: 15000yen/day</p>
                  <p>宿泊料金：15000円/一泊</p>
                </div>
                
              </div>
              </FadeIn>
            </section>
        </body>
    )
}