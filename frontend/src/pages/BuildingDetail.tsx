import '../detail.css'
import house from "../assets/house.png"
import kakurega from "../assets/kakurega.png"
import serviceImage from "../assets/service-image.png"
import { FadeIn } from '../animations/FadeIn'
//import { PaymentForm } from '../components/PaymentForm'
import CalendarData from '../components/Calendar'
import {useState, useRef, useEffect} from "react"
import emailjs from 'emailjs-com';
import Alert from '../components/Alert';


export const BuildingDetail = ()=>{
  const images = [kakurega, house, serviceImage]
  const [name, setName] = useState<string>()
  const [mail, setMail] = useState<string>()
  const [dates, setDates] = useState<Array<string>>()
  const [dates_message, setDatesMessage] = useState<string>();
  const [number, setNumber] = useState<number>();
  const [price, setPrice] = useState<string>();
  const [flagCalendar, setFlagCalendar] =useState<boolean>(false);
    const [flag, setFlag] = useState<boolean>(false);
  const [flag2, setFlag2] = useState<boolean>(false);
    const [flag3, setFlag3] = useState<boolean>(false);
  const templateId = process.env.REACT_APP_EMAILJS_BOOK_TEMPID;
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICEID;
  const userId = process.env.REACT_APP_EMAILJS_USERID;
  const suceeded_message = "Succeeded to book!"
    const failed_message = "Failed to book";
    const missed_message = "Please fill all forms";
  const bookRef:any = useRef(null)

  const scrollElement:any = useRef(null)

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= scrollElement.current.offsetWidth
    }
    const scrollRight = () =>{
      scrollElement.current.scrollLeft += scrollElement.current.offsetWidth
    }

  const handleSelected = (arg: any)=>{
    console.log(arg.startStr, arg.endStr)
    setDates([arg.startStr, arg.endStr])
    setDatesMessage(`${arg.startStr} ~ ${arg.endStr}` )
  };

  const handleCalendar = (e:any) =>{
    e.preventDefault();
    if(flagCalendar===false){
      setFlagCalendar(true);
    }else if(dates && dates.length > 0){
      setFlagCalendar(false)
    }
  }

  const sendEmail = (e:any)=>{
    e.preventDefault();
    if(!templateId || !serviceId || !userId) return console.error("You don't have env value")
    
    if(name && mail && dates && number && price){
        emailjs.sendForm(
            serviceId,
            templateId,
            bookRef.current,
            userId
        ).then(()=>{
          setName("")
            setMail("")
            setDates([])
            setDatesMessage("")
            setNumber(0)
            setPrice("")
            setFlag(true)
            
        }).catch(()=>setFlag2(true))
    }else{
        setFlag3(true)
    }
  }

  useEffect(()=>{
    if(flag === true || flag2 === true || flag3 === true){
        setTimeout(()=>{
            setFlag(false)
            setFlag2(false)
            setFlag3(false)
        },5000)
    }

  },[flag, flag2, flag3])

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
              <div className="flex flex-col items-center md:flex-row md:justify-center w-full mt-20 ">
                <div className=" flex flex-row items-center w-full md:w-1/2 h-auto px-1">
              <button onClick={()=>scrollLeft()} className="h-0 w-0 border-y-8 border-y-transparent border-r-[16px] border-r-gray-600 hover:border-r-gray-300"></button>
                <div ref={scrollElement} id="slider" className="flex flex-row  mb-5 md:mb-0 mx-1 overflow-x-scroll scroll-smooth">
                  {images.map((image,i)=>{
                    return(
                      <img className="" src={image}/>
                    )
                  })}
                </div>
                <button onClick={()=>scrollRight()} className="h-0 w-0 border-y-8 border-y-transparent border-l-[16px] border-l-gray-600 hover:border-l-gray-300"></button>
                </div>
                <div className="building-info-section flex flex-col items-center justify-center w-4/5 md:w-1/2 p-1">
                  
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
                <form onSubmit={(e:any)=>sendEmail(e)} ref={bookRef} className="mt-2 w-4/5 md:w-2/3 flex flex-col justify-center items-center text-black">
                  <input name="from_name" value={name} onChange={(e:any)=>setName(e.target.value)} className="border-2 rounded-lg p-3 my-2" type="text" placeholder='Your name'/>
                  <input name="customer_email" value={mail} onChange={(e:any)=>setMail(e.target.value)} className="border-2 rounded-lg p-3 my-2" type="email" placeholder='Your email'/>
                  <select name="booked_dates" className="border-gray-200 border-2 rounded-lg p-3" value={dates_message} onClick={handleCalendar}>
                {dates ? (
                  <option>{dates_message}</option>
                ):(
                  <option>Select dates</option>
                )}
              </select>
                <div className="text-black mt-2">
                {flagCalendar ? (
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
              

             {/* <button name="booked_dates" value={dates_message} onClick={handleCalendar} className="text-sm text-black px-3 py-1 border-2 rounded-lg" children={dates ? `${dates[0]} ~ ${dates[1]}` : "Select dates"}/>*/}
              
                  
                  <input name="customer_number" value={number} onChange={(e:any)=>setNumber(e.target.value)} className="border-2 rounded-lg p-3 my-2" type="number" placeholder='Number of people'/>
                <select name="room_fee" value={price} onChange={(e:any)=>setPrice(e.target.value)} className="my-2 form-select form-select-lg mb-3
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
                    <option value="" hidden>Select price</option>
                    <option value="6500">6500yen</option>
                    <option value="9500">9500yen</option>
                    <option value="13500">13500yen</option>
                    <option value="18500">18500yen</option>
                  </select>
                  <button type="submit" className="px-3 py-1 shadow-md hover:shadow-none hover:text-red-300 rounded-lg border-2 bg-blue-500 text-white hover:bg-blue-300">Book</button>
                  {flag ? (
                <Alert className="fixed bottom-2" onClose={()=>setFlag(false)} variant="primary" dismissible children={suceeded_message}/>
            ) : <></>}
            {flag2 ? (
                <Alert className="fixed bottom-2" onClose={()=>setFlag2(false)} variant="danger" dismissible children={failed_message}/>
            ): <></>}
            {flag3 ? (
                <Alert className="fixed bottom-2" onClose={()=>setFlag3(false)} variant="danger" dismissible children={missed_message}/>
            ): <></>}
                </form>
                
              
              {/*<PaymentForm/>*/}
            </section>
            <footer className="flex flex-row justify-center mt-10">
          <p className="text-black text-sm">CopyRight (C) 2022 VisionSwipe All rights reserved.</p>
        </footer>
        </body>
    )
}