import { firestoreApp, firebaseAuthApp } from "../firebase/apps"
import { Request, Response } from 'express'

interface RetrieveUserRequestBody {
    email: string
}
const userDataFields = {
    "gamesPlayed": 0,
    "coins": 50,
    "gameLosses": 0,
    "gameWins": 0,
    "avatar": "dog",
    "coinsSpent": 0,
    "activeTheme": "cherryblossom",
    "ownedThemes": [] as Array<string>,
    "ownedAvatars": [
        "dog"
    ]
}

export const retrieveUser = async (request: Request<any, any, RetrieveUserRequestBody, any>, response: Response) => {
    const {email} = request.body
    const userDocCollection = firestoreApp.collection('users')
    const userDocQuery = userDocCollection.doc(email)
    const doc = await userDocQuery.get()
    if (!doc.exists) {
        const newUserData = {...userDataFields, name: email.split("@")[0]}
        await userDocCollection.doc(email).set(newUserData);
        response.send(newUserData)
    } else {
        response.send(doc.data())
    }
}
