

import React from 'react'

export const Confirm = ({dates, customers,roomType,roomPrice, sendHandler, cancelHandler}:{dates:string, customers:number,roomType:number,roomPrice:Array<number>, sendHandler:any, cancelHandler:any}) => {
  return (
    <div className="p-2 rounded-lg bg-gray-500 fixed bottom-4  flex flex-col items-center justify-center text-white z-2">
        <p>Would you mind the following content of your book</p>
        <p className="mb-3">以下の予約内容でよろしいでしょうか？</p>
        <p className="text-sm">Dates(宿泊日程):{dates}</p>
        <p className="text-sm">Customers(宿泊人数):{customers}人</p>
        <p className="text-sm">Room type(部屋タイプ):T{roomType+1}</p>
        <p className="text-sm">Weekday(平日):{roomPrice[0]}円/一泊</p>
        <p className="text-sm">Holiday(休日):{roomPrice[1]}円/一泊</p>
        <p className="text-sm mb-3">Season(お正月・お盆):{roomPrice[2]}円/一泊</p>
        <div className="flex flex-row items-center">
        <button className="border-2 p-1 bg-blue-400 hover:bg-blue-200" onClick={()=>sendHandler()}>Book(予約)</button>
        <button className="border-2 p-1 bg-red-400 hover:bg-red-200" onClick={(e:any)=>{e.preventDefault();cancelHandler()}}>Back(戻る)</button>
        </div>
    </div>
  )
}
