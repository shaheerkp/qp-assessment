import {Router} from 'express'
import { login } from '../controllers/auth'
import authRoutes from './auth'


const rootRouter:Router=Router()

rootRouter.use('/auth',authRoutes)

export default rootRouter;