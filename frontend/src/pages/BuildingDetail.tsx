import '../detail.css'
import house from "../assets/house.png"
import kakurega from "../assets/kakurega.png"
import { FadeIn } from '../animations/FadeIn'
//import { PaymentForm } from '../components/PaymentForm'
import CalendarData from '../components/Calendar'
import {useState, useCallback} from "react"
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

export const BuildingDetail = ()=>{
  const images = [kakurega, house]
  const [dates, setDates] = useState<Array<string>>()
  const [flag, setFlag] = useState<boolean>(false)
  const handleSelected = (arg: any)=>{
    setDates([arg.startStr, arg.endStr])
  };

  const handleCalendar = (e:any) =>{
    e.preventDefault();
    if(flag===false){
      setFlag(true);
    }else if(dates && dates.length > 0){
      setFlag(false)
    }
  }

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
                  <p>宿泊料金：6500~18500円/一泊</p>

                  <p className='mt-5'>Building name: Hotel Kakurega in Narita</p>
                  <p >Company: Thoroubghbred Inc</p>
                  <p>Company URL: <a className="text-blue-300 hover:text-blue-500" href='https://tb-one.net/'>https://tb-one.net/</a> </p>
                  <p>Address: 982-1, Saiwai-cho, Narita-shi, Chiba-ken</p> 
                  <p>Price: 6500~18500yen/day</p>
                  
                </div>
                
              </div>
              </FadeIn>
              
                <p className="mt-4 text-black text-5xl">Book form</p>
                <form className="mt-2 w-4/5 md:w-2/3 flex flex-col justify-center items-center">
                <div className="text-black mt-2">
                {flag ? (
                   <CalendarData 
                   initialView="dayGridMonth"
                   /*select={(dateInfo:any) => {
                     console.log(dateInfo.start) //start of the range the calendar date
                     console.log(dateInfo.end) //end of the range the calendar date
                 }}*/
                   handleSelected={handleSelected}
                   />
                ) : (
                  <></>
                )}
              
              </div>
                  <button onClick={handleCalendar} className="text-sm text-black px-3 py-1 border-2 rounded-lg" children={dates ? `${dates[0]} ~ ${dates[1]}` : "Select dates"}/>
                  <input className="my-2 text-center text-black" type="number" placeholder='Number of people'/>
                <select className="my-2 form-select form-select-lg mb-3
                    appearance-none
                    block
                    w-auto
                    px-4
                    py-2
                    text-xl
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label=".form-select-lg example">
                    <option hidden>Select price</option>
                    <option value="6500">6500yen</option>
                    <option value="9500">9500yen</option>
                    <option value="13500">13500yen</option>
                    <option value="18500">18500yen</option>
                  </select>
                  <button type="submit" className="px-3 py-1 shadow-md hover:shadow-none text-black hover:text-red-300 rounded-lg border-2 hover:bg-gray-300">Book</button>
                </form>
              
              {/*<PaymentForm/>*/}
            </section>
        </body>
    )
}