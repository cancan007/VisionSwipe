import React, { useEffect, useLayoutEffect, useState } from 'react'
import { fetchKakuregaData, updateKakuregaData } from '../api/interactions';
import Alert from '../components/Alert';

export const KakuregaAdmin = () => {

    const [flag, setFlag] =useState<boolean>(false);
    const [flag2, setFlag2] = useState<boolean>(false);
    const [flag3, setFlag3] = useState<boolean>(false);

  const [season, setSeason] = useState<number>()
  const [prices1, setPrices1] = useState<Array<number>>([]);
  const [prices2, setPrices2] = useState<Array<number>>([]);
  const [prices3, setPrices3] = useState<Array<number>>([]);
  const [rooms, setRooms] = useState<Array<number>>([]);

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

  useLayoutEffect(()=>{
    (async()=>{ fetchKakuregaData()
    .then(res=>{
        setSeason(res.season);
        setPrices1(res.prices[0]);
        setPrices2(res.prices[1]);
        setPrices3(res.prices[2]);
        setRooms(res.rooms);
    })
  })();
  },[])

  useEffect(()=>{
    setTimeout(()=>{
        setFlag(false);
        setFlag2(false);
        setFlag3(false);
    }, 5000)
  },[flag, flag2, flag3])

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
                <select className="mb-2" value={season} onChange={(e:any)=>setSeason(e.target.value)}>
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
                        <p className="px-3">残り部屋数</p>
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
            </section>
            <footer className="flex flex-row justify-center mt-10">
              <p className="text-black text-sm">CopyRight (C) 2022 VisionSwipe All rights reserved.</p>
            </footer>
        </body>
  )
}
