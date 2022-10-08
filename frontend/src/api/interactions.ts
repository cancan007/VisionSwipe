

export const fetchKakuregaData= async () =>{
    const uri = process.env.REACT_APP_NODE_ENV === "development" ? "http://localhost:3001/api-kakurega" : "/api-kakurega" 
    let res = await fetch(uri,{
        method: "GET",
        mode:"cors",
        headers: {
            "Content-Type": "application/json"
        }
    })
  
   let resText = res.text()
   let resJson = JSON.parse(await resText)
   return resJson
}

export const updateKakuregaData = async(season:number, prices:Array<number[]>, rooms:number[])=>{
    const uri = process.env.REACT_APP_NODE_ENV === "development" ? "http://localhost:3001/api-kakurega" : "/api-kakurega" 
    let res = await fetch(uri,{
        method:"POST",
        mode:"cors",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            season,
            prices, 
            rooms 
        })
    })

    let resText = res.text()
   let resJson = JSON.parse(await resText)
   return resJson
}

export const fetchKakuregaRoomData = async(year:number, month:number, day:number)=>{
    const uri = process.env.REACT_APP_NODE_ENV === "development" ? `http://localhost:3001/api-kakurega/room?year=${year}&month=${month}&day=${day}` 
                                                                : `/api-kakurega/room?year=${year}&month=${month}&day=${day}` 
    let res = await fetch(uri,{
        method:"GET",
        mode:"cors",
        headers:{
            "Content-Type":"application/json"
        }
        })

    let resText = res.text()
    let resJson = JSON.parse(await resText)
    return resJson
    
}

export const updateKakuregaRoomData = async(year:number, month:number, day:number, rooms:number[])=>{
    const uri = process.env.REACT_APP_NODE_ENV === "development" ? `http://localhost:3001/api-kakurega/room` : "/api-kakurega/room"
    let res = await fetch(uri,{
        method:"POST",
        mode:"cors",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            year,
            month, 
            day,
            rooms 
        })
    })

    let resText = res.text()
   let resJson = JSON.parse(await resText)
   return resJson                          
}