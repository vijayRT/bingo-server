import { firestoreApp, firebaseAuthApp } from "../firebase/apps"
import { Request, Response } from 'express'

interface RetrieveUserRequestBody {
    email: string
}

export const retrieveUser = async (request: Request<any, any, RetrieveUserRequestBody, any>, response: Response) => {
    console.log(request.body.email)
    const userDocCollection = firestoreApp.collection('users')
    const userDocQuery = userDocCollection.doc(request.body.email)
    const doc = await userDocQuery.get()
    if (!doc.exists) {
        const newUserData = {
            "gamesPlayed": 0,
            "coins": 50,
            "gameLosses": 0,
            "gameWins": 0,
            "avatar": "dog",
            "coinsSpent": 0,
            "name": request.body.email.split('@')[0],
            "activeTheme": "cherryblossom",
            "ownedThemes": [] as Array<string>,
            "ownedAvatars": [
                "dog"
            ]
        }
        await userDocCollection.doc(request.body.email).set(newUserData);
        response.send(newUserData)
    } else {
        response.send(doc.data())
    }
}
