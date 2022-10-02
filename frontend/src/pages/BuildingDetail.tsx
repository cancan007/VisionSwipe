import '../detail.css'
import house from "../assets/house.png"
import kakurega from "../assets/kakurega.png"
import { FadeIn } from '../animations/FadeIn'
import { PaymentForm } from '../components/PaymentForm'

export const BuildingDetail = ()=>{
  const images = [kakurega, house]

    return(
        <body>
            <header className="building-detail-header flex flex-row justify-between">
                <p className="text-5xl pt-5 pl-10 fadeIn">Building detail</p>
                <a href="/" className="hover:text-blue-200 focused:text-blue-500">
                    <p className="text-xl pr-10 pt-5">Home</p>
                </a>
            </header>
            <section className="flex flex-col items-center ">
                <FadeIn>
              <div className="flex flex-col items-center md:justify-between w-full mt-20 md:flex-row">
                <div id="slider" className="flex flex-row w-4/5 md:w-1/2 h-auto mb-5 md:mb-0 md:ml-10 overflow-x-auto scroll">
                  {images.map((image,i)=>{
                    return(
                      <img className="" src={image}/>
                    )
                  })}
                  
                </div>
                
                <div className="building-info-section flex flex-col items-center justify-center w-4/5 md:w-1/2">
                  
                  <p>建物名：成田ホテル　隠れ家</p>
                  <p>会社名：株式会社サラブレッド</p>
                  <p>会社URL：<a className="text-blue-300 hover:text-blue-500" href='https://tb-one.net/'>https://tb-one.net/</a></p>
                  <p>住所：千葉県成田市幸町982-1</p>
                  <p>宿泊料金：15000円/一泊</p>

                  <p className='mt-5'>Building name: Hotel Kakurega in Narita</p>
                  <p >Company: Thoroubghbred Inc</p>
                  <p>Company URL: <a className="text-blue-300 hover:text-blue-500" href='https://tb-one.net/'>https://tb-one.net/</a> </p>
                  <p>Address: 982-1, Saiwai-cho, Narita-shi, Chiba-ken</p> 
                  <p>Price: 15000yen/day</p>
                  
                </div>
                
              </div>
              </FadeIn>
              <PaymentForm/>
            </section>
        </body>
    )
}