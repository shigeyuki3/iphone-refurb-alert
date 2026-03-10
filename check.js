const API="https://www.apple.com/jp/shop/refurbished/iphone?ajax=true"

const TOKEN=process.env.LINE_CHANNEL_ACCESS_TOKEN
const USER=process.env.LINE_USER_ID

async function notify(text){

 await fetch("https://api.line.me/v2/bot/message/push",{
  method:"POST",
  headers:{
   "Content-Type":"application/json",
   "Authorization":"Bearer "+TOKEN
  },
  body:JSON.stringify({
   to:USER,
   messages:[{type:"text",text}]
  })
 })

}

async function run(){

 const res=await fetch(API)
 const data=await res.json()

 const items=data.tiles.map(v=>v.title)

 const air=items.filter(v=>v.includes("Air"))

 if(air.length){

  await notify("整備済みに iPhone Air が追加されました\n\n"+air.join("\n"))

 }

}

run()
