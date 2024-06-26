import express ,{Express,Request,Response}from 'express'
import { PORT } from './secrets';
import rootRouter from './routes';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middlewares/error';
import { SignUpSchema } from './schema/user';

const app:Express= express()

app.use(express.json())
app.use('/api',rootRouter)

export const prismaClient=new PrismaClient({
   log:['query']
})

app.use(errorMiddleware)


app.listen(PORT,()=>console.log(`app working in ${PORT}`))