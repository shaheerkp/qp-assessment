import {Router} from 'express'
import { login } from '../controllers/auth'
import authRoutes from './auth'
import productsRoutes from './products'


const rootRouter:Router=Router()

rootRouter.use('/auth',authRoutes)
rootRouter.use('/products',productsRoutes)


export default rootRouter;