const URL="https://www.apple.com/jp/shop/refurbished/iphone"

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

 const res=await fetch(URL)
 const html=await res.text()

 if(html.includes("Air")){

  await notify("整備済みに iPhone Air が追加された可能性があります\nhttps://www.apple.com/jp/shop/refurbished/iphone")

 }

}

run()
