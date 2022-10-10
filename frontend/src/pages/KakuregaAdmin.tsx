import React, { useEffect, useLayoutEffect, useState } from 'react'
import { fetchKakuregaData, fetchKakuregaRoomData,updateKakuregaData, updateKakuregaRoomData } from '../api/interactions';
import Alert from '../components/Alert';
import CalendarData from '../components/Calendar';

export const KakuregaAdmin = () => {
    const USER = process.env.REACT_APP_KAKUREGA_USER;
    const PASSWORD = process.env.REACT_APP_KAKUREGA_PASSWORD;
    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    
    const [flag, setFlag] =useState<boolean>(false);
    const [flag2, setFlag2] = useState<boolean>(false);
    const [flag3, setFlag3] = useState<boolean>(false);

    const [flagCalendar, setFlagCalendar] = useState<boolean>(false);
    const [flag4, setFlag4] = useState<boolean>(false);
    const [flag5, setFlag5] = useState<boolean>(false);
    const [flag6, setFlag6] = useState<boolean>(false);

    //ホテル基本設定
  const [season, setSeason] = useState<number>()
  const [prices1, setPrices1] = useState<Array<number>>([]);
  const [prices2, setPrices2] = useState<Array<number>>([]);
  const [prices3, setPrices3] = useState<Array<number>>([]);
  const [rooms, setRooms] = useState<Array<number>>([]);

   //予約・部屋数設定
   const [date, setDate] = useState<string>();
   const [year, setYear] = useState<number>();
   const [month, setMonth] = useState<number>();
   const [day, setDay] = useState<number>();
   const [usedRooms, setUsedRooms] = useState<Array<number>>([]);
   const [events, setEvents] = useState<Array<any>>();
  const suceeded_message = "Succeeded to updated kakurega data!"
    const failed_message = "Failed to update";
    const missed_message = "Please fill all forms";

  

const confirmArray = (array:Array<any>) =>{
    let count = 0;
    for(let i:number = 0; i<array.length; i++){
      if(array[i] === "") {
        break
      }
      else if(!array[i]){
        break
      }else{
        count++;
      }
    }
    return count;
}

  const updateData = async(e:any)=>{
    e.preventDefault();
    if(!season || confirmArray(prices1) < 4 || confirmArray(prices2) < 4 || confirmArray(prices3) < 4 || confirmArray(rooms) < 4) {
        setFlag3(true);
        return
    }
    try{
        const res = await updateKakuregaData(season, [prices1, prices2, prices3], rooms)
        setSeason(res.season);
        setPrices1(res.prices[0]);
        setPrices2(res.prices[1]);
        setPrices3(res.prices[2]);
        setRooms(res.rooms);
        setFlag(true)
    }catch(err){
        setFlag2(true);
    }
  }

  //calendarのselect用
  const handleSelected = (arg:any)=>{
    setDate(arg.startStr)
    const date = arg.startStr.split('-');
    //console.log(Number(date[2]))
    setYear(Number(date[0]));
    setMonth(Number(date[1]));
    setDay(Number(date[2]));
  }

  //calendarのdateOnclick用
  const handlerSelectedData = (arg:any)=>{
    setDate(arg.dateStr)
    const date = arg.dateStr.split('-');
    console.log(Number(date[2]))
    setYear(Number(date[0]));
    setMonth(Number(date[1]));
    setDay(Number(date[2]));
  }

  const handleCalendar = ()=>{
    if(flagCalendar){
        setFlagCalendar(false)
    }else if(!flagCalendar){
        setFlagCalendar(true);
    }
  }

  const updateRoomData = async(e:any)=>{
    e.preventDefault();
    if(!year || !month || !day || confirmArray(rooms || confirmArray(usedRooms)) < 4){
        setFlag6(true);
        return
    } try{
        const res = await updateKakuregaRoomData(year, month, day, usedRooms);
        setDate(`${res.year}-${res.month}-${res.day}`)
        setYear(res.year);
        setMonth(res.month);
        setDay(res.day);
        setUsedRooms(res.rooms);
        setFlag4(true);
        getRoomData()
    }catch(err){
        setFlag5(true)
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

  const getData = async()=>{
    let data = await fetchKakuregaData()
        .then(res=>{
            setSeason(res.season);
            setPrices1(res.prices[0]);
            setPrices2(res.prices[1]);
            setPrices3(res.prices[2]);
            setRooms(res.rooms);
        }
    )
    return data;
      
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

  useLayoutEffect(()=>{
    getData()
  },[])

  useLayoutEffect(()=>{
    getRoomData()
  },[rooms])

  useEffect(()=>{
    setTimeout(()=>{
        setFlag(false);
        setFlag2(false);
        setFlag3(false);
        setFlag4(false);
        setFlag5(false);
        setFlag6(false);
    }, 5000)
  },[flag, flag2, flag3, flag4, flag5, flag6])

  if(user !== USER || password !== PASSWORD ){
    return (
        <div className="h-screen text-black flex flex-col items-center justify-center">
           <p>成田ホテル隠れ家ログイン画面</p>
           <input className="px-2 py-1 border-2" type="text" placeholder='ユーザー名' onChange={(e:any)=>setUser(e.target.value)}/>
           <input className="px-2 py-1 border-2" type="text" placeholder='パスワード' onChange={(e:any)=>setPassword(e.target.value)}/>
        </div>
    )
   }else
    return (
        <body className="flex flex-col items-center">
            <header className="w-full flex flex-row justify-end">
                <a className="mt-2 mr-4" href="/kakurega">
                    <p className="text-blue-400 text-sm hover:text-blue-200">隠れ家予約ホームへ</p>
                </a>
            </header>
            <section className="w-full flex flex-col items-center self-center text-black">
              <p className="text-2xl md:text-4xl mt-6 mb-2">成田ホテル隠れ家 管理画面</p>
              <form className="w-4/5 md:w-3/5 flex flex-col items-center">
                <p className="text-xl md:text-2xl mb-1">ホテル情報・基本設定</p>
                <select className="mb-2 border-2 rounded-lg px-2 py-1" value={season} onChange={(e:any)=>setSeason(e.target.value)}>
                    <option hidden>シーズンを選択</option>
                    <option value="0">OFF(平日)</option>
                    <option value="1">ON(休前日)</option>
                    <option value="2">超ON(お正月・お盆)</option>
                </select>
                <div className="flex flex-col md:flex-row">
                <div className="flex flex-row h-auto">
                    <div className="bg-gray-500 w-1/3 flex flex-col justify-center mr-2">
                        <p className="px-2">料金体系OFF</p>
                    </div>
                    <div className="flex flex-col">
                    <input value={prices1[0]} type="number" className="px-1" placeholder="料金体系１" onChange={(e:any)=>setPrices1([e.target.value,prices1[1], prices1[2],prices1[3] ])}/>
                    <input value={prices1[1]}  type="number" className="px-1" placeholder='料金体系２' onChange={(e:any)=>setPrices1([prices1[0],e.target.value, prices1[2],prices1[3] ])}/>
                    <input value={prices1[2]}  type="number" className="px-1" placeholder="料金体系３" onChange={(e:any)=>setPrices1([prices1[0],prices1[1],e.target.value, prices1[3] ])}/>
                    <input value={prices1[3]}  type="number" className="px-1" placeholder='料金体系４' onChange={(e:any)=>setPrices1([prices1[0],prices1[1],prices1[2],e.target.value])}/>
                    </div>
                </div>
                <hr/>
                <div className="flex flex-row h-auto">
                    <div className="bg-gray-500 w-1/3 flex flex-col justify-center mr-2">
                        <p className="px-2">料金体系ON</p>
                    </div>
                    <div className="flex flex-col">
                    <input value={prices2[0]}  type="number" className="px-1" placeholder="料金体系１" onChange={(e:any)=>setPrices2([e.target.value,prices2[1], prices2[2],prices2[3] ])}/>
                    <input value={prices2[1]}  type="number" className="px-1" placeholder='料金体系２' onChange={(e:any)=>setPrices2([prices2[0],e.target.value, prices2[2],prices2[3] ])}/>
                    <input value={prices2[2]}  type="number" className="px-1" placeholder="料金体系３" onChange={(e:any)=>setPrices2([prices2[0], prices2[1],e.target.value, prices2[3] ])}/>
                    <input value={prices2[3]}  type="number" className="px-1" placeholder='料金体系４' onChange={(e:any)=>setPrices2([prices2[0], prices2[1],prices2[2] ,e.target.value])}/>
                    </div>
                </div>
                <hr/>
                <div className="flex flex-row h-auto">
                    <div className="bg-gray-500 w-1/3 flex flex-col justify-center mr-2">
                        <p className="px-2">料金体系超ON</p>
                    </div>
                    <div className="flex flex-col">
                    <input value={prices3[0]}  type="number" className="px-1" placeholder="料金体系１" onChange={(e:any)=>setPrices3([e.target.value, prices3[1],prices3[2],prices3[3]])}/>
                    <input value={prices3[1]}  type="number" className="px-1" placeholder='料金体系２' onChange={(e:any)=>setPrices3([prices3[0],e.target.value, prices3[2],prices3[3]])}/>
                    <input value={prices3[2]} type="number" className="px-1" placeholder="料金体系３" onChange={(e:any)=>setPrices3([prices3[0], prices3[1],e.target.value,prices3[3]])}/>
                    <input value={prices3[3]} type="number" className="px-1" placeholder='料金体系４'onChange={(e:any)=>setPrices3([prices3[0], prices3[1],prices3[2] ,e.target.value])}/>
                    </div>
                </div>
                <hr/>
                </div>
                <div className="flex flex-row h-auto">
                    <div className="bg-gray-500 w-1/3 flex flex-col justify-center mr-2">
                        <p className="px-3">部屋数</p>
                    </div>
                    <div className="flex flex-col">
                        <input value={rooms[0]} type="number" className="px-1" placeholder="残り部屋数１" onChange={(e:any)=>setRooms([e.target.value, rooms[1], rooms[2], rooms[3]])}/>
                        <input value={rooms[1]} type="number" className="px-1" placeholder='残り部屋数２' onChange={(e:any)=>setRooms([rooms[0], e.target.value, rooms[2], rooms[3]])}/>
                        <input value={rooms[2]} type="number" className="px-1" placeholder="残り部屋数３" onChange={(e:any)=>setRooms([rooms[0], rooms[1], e.target.value, rooms[3]])}/>
                        <input value={rooms[3]} type="number" className="px-1" placeholder='残り部屋数４' onChange={(e:any)=>setRooms([rooms[0], rooms[1], rooms[2],e.target.value])}/>
                    </div>
                </div>
                {flag ? (
                <Alert className="fixed bottom-2" onClose={()=>setFlag(false)} variant="primary" dismissible children={suceeded_message}/>
            ) : <></>}
            {flag2 ? (
                <Alert className="fixed bottom-2" onClose={()=>setFlag2(false)} variant="danger" dismissible children={failed_message}/>
            ): <></>}
            {flag3 ? (
                <Alert className="fixed bottom-2" onClose={()=>setFlag3(false)} variant="danger" dismissible children={missed_message}/>
            ): <></>}
                <button onClick={(e:any)=>updateData(e)} className="rounde border-2 px-2 py-1 hover:bg-gray-500 hover:text-white focused:bg-black focused:text-white">保存</button>
              </form>
              <form className="w-full md:w-4/5 flex flex-col items-center mt-5">
                <p className="text-xl md:text-3xl">予約日時・部屋数管理設定</p>
                {
                    flagCalendar ? (
                        <>
                        <p className="text-xs text-red-400">*残り部屋数が表示されます</p>
                        <CalendarData
                        initialView="dayGridMonth"
                        /*handleSelected={handleSelected}*/
                        handleSelectedData={handlerSelectedData}
                        events={events}
                        />
                        </>
                    ):(<></>)
                }
                <select className="border-2 rounded-lg p-2" onClick={handleCalendar}>
                    <option hidden>{date?`${date}` :"日時を選択してください"}</option>
                </select>
                <div className="flex flex-row h-auto">
                    <div className="bg-gray-500 w-1/3 flex flex-col justify-center mr-2">
                        <p className="px-3">稼働部屋数</p>
                    </div>
                    <div className="flex flex-col">
                        <input value={usedRooms[0]} type="number" className="px-1" placeholder="稼働部屋数１" onChange={(e:any)=>setUsedRooms([e.target.value, usedRooms[1], usedRooms[2], usedRooms[3]])}/>
                        <input value={usedRooms[1]} type="number" className="px-1" placeholder='稼働部屋数２' onChange={(e:any)=>setUsedRooms([usedRooms[0], e.target.value, usedRooms[2], usedRooms[3]])}/>
                        <input value={usedRooms[2]} type="number" className="px-1" placeholder="稼働部屋数３" onChange={(e:any)=>setUsedRooms([usedRooms[0], usedRooms[1], e.target.value, usedRooms[3]])}/>
                        <input value={usedRooms[3]} type="number" className="px-1" placeholder='稼働部屋数４' onChange={(e:any)=>setUsedRooms([usedRooms[0], usedRooms[1], usedRooms[2],e.target.value])}/>
                    </div>
                </div>
                {flag4 ? (
                <Alert className="fixed bottom-2" onClose={()=>setFlag(false)} variant="primary" dismissible children={suceeded_message}/>
            ) : <></>}
            {flag5 ? (
                <Alert className="fixed bottom-2" onClose={()=>setFlag2(false)} variant="danger" dismissible children={failed_message}/>
            ): <></>}
            {flag6 ? (
                <Alert className="fixed bottom-2" onClose={()=>setFlag3(false)} variant="danger" dismissible children={missed_message}/>
            ): <></>}
                <button onClick={(e:any)=>updateRoomData(e)} className="rounde border-2 px-2 py-1 hover:bg-gray-500 hover:text-white focused:bg-black focused:text-white">保存</button>

              </form>
            </section>
            <footer className="flex flex-row justify-center mt-10">
              <p className="text-black text-sm">CopyRight (C) 2022 VisionSwipe All rights reserved.</p>
            </footer>
        </body>
  )
}
