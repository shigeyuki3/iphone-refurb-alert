const URL="https://www.apple.com/jp/shop/refurbished/iphone"

const TOKEN=process.env.LINE_CHANNEL_ACCESS_TOKEN
const USER=process.env.LINE_USER_ID

const fs=require("fs")

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

 const regex=/iPhone\s?Air[^\<]{0,80}/gi
 const matches=[...html.matchAll(regex)].map(v=>v[0])

 if(matches.length===0){
  console.log("iPhone Airなし")
  return
 }

 let previous=[]

 if(fs.existsSync("cache.json")){
  previous=JSON.parse(fs.readFileSync("cache.json"))
 }

 const newItems=matches.filter(v=>!previous.includes(v))

 if(newItems.length){

  await notify(
   "整備済みに iPhone Air が追加されました\n\n"+
   newItems.join("\n")+
   "\n\nhttps://www.apple.com/jp/shop/refurbished/iphone"
  )

 }

 fs.writeFileSync("cache.json",JSON.stringify(matches))

}

run()
