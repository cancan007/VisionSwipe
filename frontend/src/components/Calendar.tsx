import React, { useCallback, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

const CalendarData = ({initialView,handleSelected, handleSelectedData,events}:{initialView:string,handleSelected?:any, handleSelectedData?:any, events?:Array<any>}) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin,timeGridPlugin, interactionPlugin]}
      initialView={initialView}
      locale="ja"
      events={events}
      /*
      datesSet={(arg) => {
        console.log(arg.start) //starting visible date
        console.log(arg.end) //ending visible date
      }}*/
      // 登録済みのイベントの配列
      /*
      events={[
        { title: "event 1", start: "2021-06-01" },
        { title: "event 2", start: "2021-06-03", end: "2021-06-05" }, 
        {
          title: "event 3",
          start: "2021-06-07T10:00:00", // 時間を指定するときはISO 8601の形式で。
        },
      ]}*/
      selectable={true}
      //editable={true}
      dateClick={(arg:any)=>{handleSelectedData(arg)}}
      /*
      select={(dateInfo) => {
        console.log(dateInfo.startStr) //start of the range the calendar date
        console.log(dateInfo.endStr) //end of the range the calendar date
    }}*/
    select={(dateInfo) => handleSelected(dateInfo)}
    />
  );
};
export default CalendarData;