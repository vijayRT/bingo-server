import {Router} from 'express'
import {signInController, updateUserDataController} from './controller'

const userRouter = Router()

userRouter.post('/', signInController)
userRouter.patch('/:email', updateUserDataController)

export default userRouter