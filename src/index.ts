import express ,{Express,Request,Response}from 'express'

const app:Express= express()

app.get('/',(req,res)=>{
   res.send('working');
})


app.listen(3000,()=>console.log('app working'))