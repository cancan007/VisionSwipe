import '../detail.css'

import kakurega from "../assets/kakurega.png"

import { FadeIn } from '../animations/FadeIn'
//import { PaymentForm } from '../components/PaymentForm'
import CalendarData from '../components/Calendar'
import {useState, useRef, useEffect, useLayoutEffect} from "react"
import emailjs from 'emailjs-com';
import Alert from '../components/Alert';
import { fetchKakuregaData, fetchKakuregaRoomData, fetchKakuregaRoomStartEnd } from '../api/interactions'
import { CardNumberElementComponent } from '@stripe/react-stripe-js'
import { Confirm } from '../components/Confirm'


export const BuildingDetail = ()=>{
  const images = [kakurega, "https://res.cloudinary.com/dbfpsigax/image/upload/v1664712298/%E6%88%90%E7%94%B0%E3%83%9B%E3%83%86%E3%83%AB%E9%9A%A0%E3%82%8C%E5%AE%B6/201_k6tewz.jpg",  "https://res.cloudinary.com/dbfpsigax/image/upload/v1664891514/%E6%88%90%E7%94%B0%E3%83%9B%E3%83%86%E3%83%AB%E9%9A%A0%E3%82%8C%E5%AE%B6/106_qtpruk.jpg","https://res.cloudinary.com/dbfpsigax/image/upload/v1664712249/%E6%88%90%E7%94%B0%E3%83%9B%E3%83%86%E3%83%AB%E9%9A%A0%E3%82%8C%E5%AE%B6/DSC_0113_nr320r.jpg"
, "https://res.cloudinary.com/dbfpsigax/image/upload/v1664891431/%E6%88%90%E7%94%B0%E3%83%9B%E3%83%86%E3%83%AB%E9%9A%A0%E3%82%8C%E5%AE%B6/%E3%83%92%E3%83%8E%E3%82%AD%E9%A2%A8%E5%91%82_gzgg3v.jpg",
"https://res.cloudinary.com/dbfpsigax/image/upload/v1664891471/%E6%88%90%E7%94%B0%E3%83%9B%E3%83%86%E3%83%AB%E9%9A%A0%E3%82%8C%E5%AE%B6/%E8%89%B2%E5%BD%A9%E8%A3%9C%E6%AD%A3%EF%BC%94_kiypf4.png", "https://res.cloudinary.com/dbfpsigax/image/upload/v1664712223/%E6%88%90%E7%94%B0%E3%83%9B%E3%83%86%E3%83%AB%E9%9A%A0%E3%82%8C%E5%AE%B6/%E5%AE%B6%E5%85%B7%E5%85%A5%E3%82%8A%E9%83%A8%E5%B1%8B_gspqis.jpg"]
  const [name, setName] = useState<string>()
  const [mail, setMail] = useState<string>()
  const [dates, setDates] = useState<Array<string>>()
  const [dates_message, setDatesMessage] = useState<string>();
  const [number, setNumber] = useState<number>();
  const [roomType, setRoomType] = useState<number>();
  const [flagCalendar, setFlagCalendar] =useState<boolean>(false);
  const [flag, setFlag] = useState<boolean>(false);
  const [flag2, setFlag2] = useState<boolean>(false);
  const [flag3, setFlag3] = useState<boolean>(false);
  const [flag4, setFlag4] = useState<boolean>(false);
  const [flagConfirm, setFlagConfirm] = useState<boolean>(false);
  const [season, setSeason] = useState<number>();
  const [prices1, setPrices1] = useState<Array<number>>([]);
  const [prices2, setPrices2] = useState<Array<number>>([]);
  const [prices3, setPrices3] = useState<Array<number>>([]);
  const [rooms, setRooms] = useState<Array<number>>([]);

  const [events, setEvents] = useState<Array<any>>();
  const [confirmRooms, setConfirmRooms] = useState<Array<any>>();

  const templateId = process.env.REACT_APP_EMAILJS_BOOK_TEMPID;
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICEID;
  const userId = process.env.REACT_APP_EMAILJS_USERID;
  const suceeded_message = "Succeeded to book!"
    const failed_message = "Failed to book";
    const missed_message = "Please fill all forms";
    const not_available_message = "There is no rooms, please check available dates on calendar"
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
    //const endDate = arg.endStr.split('-');

    setDates([arg.startStr, arg.endStr])
    setDatesMessage(`${arg.startStr} ~ ${arg.endStr}` )
  };

  const handleCalendar = (e:any) =>{
    e.preventDefault();
    if(flagCalendar===false){
      setFlagCalendar(true);
    }else if(flagCalendar === true){
      setFlagCalendar(false)
    }
  }

  const sendEmail = ()=>{
    //e.preventDefault();
    if(!templateId || !serviceId || !userId) return console.error("You don't have env value")
    
    if(name && mail && dates && number && roomType){
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
            setRoomType(undefined)
            setFlag(true)
            
        }).catch(()=>setFlag2(true))
    }else{
        setFlag3(true)
    }
  }

  const organizedEvents = (events:Array<any>):Array<any>=>{
    
    const list:Array<any> = []
        events.map((e:any)=>{
            for(let i=0; i<e.rooms.length;i++){
                
                let strm, strd;
                if(Number(e.month)<10){
                  strm = `0${e.month}`
                }else{
                    strm=e.month;
                }
                if(Number(e.day)<10){
                    strd = `0${e.day}`
                }else{
                    strd = e.day
                }
                const restRoom = Number(rooms[i])-Number(e.rooms[i])
                if(restRoom === 0 || restRoom < 0){
                    const event = {title:`T${i+1}:${restRoom}`,start:`${e.year}-${strm}-${strd}`, color:"red"}
                    list.push(event);
                }else{
                    const event = {title:`T${i+1}:${restRoom}`,start:`${e.year}-${strm}-${strd}`}
                    list.push(event);
                }
                
            }
        })

    return list
  }

  const getRoomData = async()=>{
    var today = new Date();
  var year = today.getFullYear();
  var month = (today.getMonth()+1);
  var day = today.getDate();
  await fetchKakuregaRoomData(year, month, day)
    .then(res=>{
        let es = organizedEvents(res);
        setEvents(es);
        //console.log(es);
    })
  }

  const confirmRoomStartEndChild = (roomType:number,events:Array<any>):boolean=>{
    if(events.length === 0) return false;
    for(let i=0; i<events.length;i++){
      let e = events[i];
      const resRooms = rooms[roomType] - e.rooms[roomType] -1;
      //console.log(resRooms)
      if(resRooms < 0) return false;
    }
    /*
    events.map((e:any)=>{
      const resRooms = rooms[roomType] - e.rooms[roomType] -1;
      console.log(resRooms)
      if(resRooms < 0) return false;
    })*/
    return true;
  }

  const confirmRoomStartEnd = async(roomType:number)=>{
    if(dates === undefined) return false;
    const [start, end] = dates;
    const [year, month, day] = start.split("-").map((e:string)=>Number(e));
    const [endyear, endmonth, endday] = end.split("-").map((e:string)=>Number(e));
    let res = await fetchKakuregaRoomStartEnd(year, month, day, endyear, endmonth, endday);
    return confirmRoomStartEndChild(roomType,res)
  }

  const handleConfirm = async(e:any)=>{
    e.preventDefault()
    if(!roomType || !name || !mail || !dates || !number) {
      setFlag3(true)
      return
    }
    const confirm = await confirmRoomStartEnd(roomType)
    if(confirm){
      setFlagConfirm(true)
      return
    }
    else {
      setFlag4(true)
      return
    }
  }

  useLayoutEffect(()=>{
    (async()=>{ fetchKakuregaData()
      .then(res=>{
          setSeason(res.season);
          setPrices1(res.prices[0]);
          setPrices2(res.prices[1]);
          setPrices3(res.prices[2]);
          setRooms(res.rooms);
      }).catch(err=>console.error(err));
    })();
  },[])

  useLayoutEffect(()=>{
    getRoomData()
  },[rooms])

  useEffect(()=>{
    if(flag === true || flag2 === true || flag3 === true || flag4 === true){
        setTimeout(()=>{
            setFlag(false)
            setFlag2(false)
            setFlag3(false)
            setFlag4(false)
        },5000)
    }

  },[flag, flag2, flag3, flag4])

    return(
        <body>
            <header className="building-detail-header flex flex-row justify-between">
                <p className="text-5xl pt-5 pl-10 fadeIn">Building detail</p>
                <div className="flex flex-row items-center ">
                  <a href="/kakurega/admin" className="hover:text-blue-200 focused:text-blue-500">
                    <p className="text-xl pr-10 pt-5">Admin</p>
                  </a>
                <a href="/" className="hover:text-blue-200 focused:text-blue-500">
                    <p className="text-xl pr-10 pt-5">Home</p>
                </a>
                </div>
            </header>
            <section className="flex flex-col items-center ">
                <FadeIn>
              <div className="flex flex-col items-center md:flex-row md:justify-center w-full mt-20 ">
                <div className=" flex flex-row items-center w-full md:w-1/2 h-auto px-1 ">
              <button onClick={()=>scrollLeft()} className="h-0 w-0 border-y-8 border-y-transparent border-r-[16px] border-r-gray-600 hover:border-r-gray-300"></button>
                <div ref={scrollElement} id="slider" className="flex flex-row  mb-5 md:mb-0 mx-1 overflow-x-scroll scroll-smooth">
                  {images.map((image,i)=>{
                    return(
                      <img className="object-contain max-h-[500px]" src={image}/>
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
                  <div className="flex flex-row text-xs p-2">
                    <p>平日料金/一泊：</p>
                    <div className="flex flex-col">
                       <p>T1:{prices1[0]}円(満4人), T2:{prices1[1]}円(満4人)</p>
                       <p>T3:{prices1[2]}円(満4~6人), T4:{prices1[3]}円(満6~8人)</p>
                    </div>
                  
                  </div>
                  <div className="flex flex-row text-xs p-2">
                    <p>休日料金/一泊：</p>
                    <div className="flex flex-col">
                       <p>T1:{prices2[0]}円(満4人), T2:{prices2[1]}円(満4人)</p>
                       <p>T3:{prices2[2]}円(満4~6人), T4:{prices2[3]}円(満6~8人)</p>
                    </div>
                  </div>
                  <div className="flex flex-row text-xs p-2">
                    <p>お盆・お正月料金/一泊：</p>
                    <div className="flex flex-col">
                       <p>T1:{prices3[0]}円(満4人), T2:{prices3[1]}円(満4人)</p>
                       <p>T3:{prices3[2]}円(満4~6人), T4:{prices3[3]}円(満6~8人)</p>
                    </div>
                  </div>
                  {/*<div className="flex flex-row text-xs p-2">
                    <p>料金タイプ別お部屋残数：</p>
                    <div className="flex flex-col">
                       <p>{rooms[0]}部屋(満4人),{rooms[1]}部屋(満4人)</p>
                       <p>{rooms[2]}部屋(満4~6人),{rooms[3]}部屋(満6~8人)</p>
                    </div>
                </div>*/}
                  

                  <p className='mt-5'>Building name: Hotel Kakurega in Narita</p>
                  <p >Company: Thoroubghbred Inc</p>
                  <p>Company URL: <a className="text-blue-300 hover:text-blue-500" href='https://tb-one.net/'>https://tb-one.net/</a> </p>
                  <p>Address: 982-1, Saiwai-cho, Narita-shi, Chiba-ken</p> 
                  <div className="flex flex-row text-xs p-2">
                    <p>Weekday fee/1night：</p>
                    <div className="flex flex-col">
                       <p>T1:{prices1[0]}yen(Max4), T2:{prices1[1]}yen(Max4)</p>
                       <p>T3:{prices1[2]}yen(Max4~6), T4:{prices1[3]}yen(Max6~8)</p>
                    </div>
                  </div>
                  <div className="flex flex-row text-xs p-2">
                    <p>Holiday fee/1night：</p>
                    <div className="flex flex-col">
                       <p>T1:{prices2[0]}yen(Max4), T2:{prices2[1]}yen(Max4)</p>
                       <p>T4:{prices2[2]}yen(Max4~6), T3:{prices2[3]}yen(Max6~8)</p>
                    </div>
                  </div>
                  <div className="flex flex-row text-xs p-2">
                    <p>Season fee/1night：</p>
                    <div className="flex flex-col">
                       <p>T1:{prices3[0]}yen(Max4), T2:{prices3[1]}yen(Max4)</p>
                       <p>T3:{prices3[2]}yen(Max4~6), T4:{prices3[3]}yen(Max6~8)</p>
                    </div>
                  </div>
                  {/*<div className="flex flex-row text-xs p-2">
                    <p>Rest of ：</p>
                    <div className="flex flex-col">
                       <p>{rooms[0]}部屋(満4人),{rooms[1]}部屋(満1人)</p>
                       <p>{rooms[2]}部屋(満2~3人),{rooms[3]}部屋(満3~4人)</p>
                    </div>
                </div>*/}
                  
                </div>
                
              </div>
              </FadeIn>
              
                <p className="mt-4 text-black text-3xl">Book form (予約フォーム)</p>
                <form /*onSubmit={(e:any)=>sendEmail(e)}*/ ref={bookRef} className="mt-2 w-4/5 md:w-2/3 flex flex-col justify-center items-center text-black">
                  <input name="from_name" value={name} onChange={(e:any)=>setName(e.target.value)} className="border-2 rounded-lg p-3 my-2" type="text" placeholder='Your name(お名前)'/>
                  <input name="customer_email" value={mail} onChange={(e:any)=>setMail(e.target.value)} className="border-2 rounded-lg p-3 my-2" type="email" placeholder='Your email(メールアドレス)'/>
                  <select name="booked_dates" className="border-gray-200 border-2 rounded-lg p-3" value={dates_message} onClick={handleCalendar}>
                    {
                      dates ? (
                        <option hidden>{ dates.length > 0 ? `${dates_message}` : "Select dates"}</option>
                      ) : (
                        <option hidden>Select dates</option>
                      )
                    }
                  
                
              </select>
                <div className="text-black mt-2">
                
                {flagCalendar ? (
                  <>
                  <p className="text-xs text-red-400">*料金タイプごとの残り部屋数が表示されます</p>
                  
                   <CalendarData 
                   
                   initialView="dayGridMonth"
                   events={events}
                   /*select={(dateInfo:any) => {
                     console.log(dateInfo.start) //start of the range the calendar date
                     console.log(dateInfo.end) //end of the range the calendar date
                 }}*/
                   handleSelected={handleSelected}
                   />
                   
                   </>

                  

                ) : (
                  <></>
                )}
              
              </div>
              

             {/* <button name="booked_dates" value={dates_message} onClick={handleCalendar} className="text-sm text-black px-3 py-1 border-2 rounded-lg" children={dates ? `${dates[0]} ~ ${dates[1]}` : "Select dates"}/>*/}
              
                  
                  <input name="customer_number" value={number} onChange={(e:any)=>setNumber(e.target.value)} className="border-2 rounded-lg p-3 my-2" type="number" placeholder='Number of people(人数)'/>
                <select name="room_fee" value={roomType !== undefined ? prices1[roomType]: ""} onChange={(e:any)=>{setRoomType(Number(prices1.indexOf(e.target.value)));/*console.log(prices1.indexOf(e.target.value))*/}} className="my-2 form-select form-select-lg mb-3
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
                    <option value="" hidden>Select price(料金タイプ)</option>
                    <option value={prices1[0]} id="0">T1:{prices1[0]}yen</option>
                    <option value={prices1[1]} id="1">T2:{prices1[1]}yen</option>
                    <option value={prices1[2]} id="2">T3:{prices1[2]}yen</option>
                    <option value={prices1[3]} id="3">T4:{prices1[3]}yen</option>
                  </select>
                  
                  <button /*type="submit"*/ onClick={(e:any)=>handleConfirm(e)} className="px-3 py-1 shadow-md hover:shadow-none hover:text-red-300 rounded-lg border-2 bg-blue-500 text-white hover:bg-blue-300">Book(予約)</button>
                  {flag ? (
                <Alert className="fixed bottom-2" onClose={()=>setFlag(false)} variant="primary" dismissible children={suceeded_message}/>
            ) : <></>}
            {flag2 ? (
                <Alert className="fixed bottom-2" onClose={()=>setFlag2(false)} variant="danger" dismissible children={failed_message}/>
            ): <></>}
            {flag3 ? (
                <Alert className="fixed bottom-2" onClose={()=>setFlag3(false)} variant="danger" dismissible children={missed_message}/>
            ): <></>}
            {flag4 ? (
                <Alert className="fixed bottom-2" onClose={()=>setFlag3(false)} variant="danger" dismissible children={not_available_message}/>
            ): <></>}
                </form>
                {
                    flagConfirm && number &&roomType &&dates_message && prices1 && prices2 && prices3 && roomType && (
                      
                      <Confirm
                      dates={dates_message}
                      customers={number}
                      roomType={roomType}
                      roomPrice={[prices1[roomType], prices2[roomType], prices3[roomType]]}
                      sendHandler={()=>sendEmail()}
                      cancelHandler={()=>setFlagConfirm(false)}
                      />

                    )
                  }
                
              
              {/*<PaymentForm/>*/}
            </section>
            <footer className="flex flex-row justify-center mt-10">
          <p className="text-black text-sm">CopyRight (C) 2022 VisionSwipe All rights reserved.</p>
        </footer>
        </body>
    )
}