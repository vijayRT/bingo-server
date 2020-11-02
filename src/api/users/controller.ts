import { Request, Response, Router } from 'express'
import { firestoreApp } from '../../firebase/apps'
import { createUser, updateUser, retrieveUser } from './model'

interface RetrieveUserRequestBody {
    email: string
}

export const signInController = async (request: Request<any, any, RetrieveUserRequestBody, any>, response: Response) => {
    const {email} = request.body
    const doc = await retrieveUser(email)
    if (!doc.exists) {
        const newUserDocData = await createUser(email)
        response.send(newUserDocData)
    } else {
        response.send(doc.data())
    }
}

interface ChangeUserDataRequestParams {
    email: string
}

interface ChangeUserDataRequestBody {
    name?: string,
    avatar?: string,
    theme?: string
}

type ChangeUserDataRequest = Request<ChangeUserDataRequestParams, any, ChangeUserDataRequestBody, any>
export const updateUserDataController = async (request: ChangeUserDataRequest, response: Response) => {
    const updateUserResult = await updateUser(request.params.email, request.body).catch(error => error as Error)
    console.log(updateUserResult)
    if (updateUserResult instanceof Error) {
        response.status(500).send(updateUserResult)
    } else {
        response.sendStatus(200)
    }
}