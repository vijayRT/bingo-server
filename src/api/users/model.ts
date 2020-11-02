import { firestoreApp } from "../../firebase/apps"

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

export const retrieveUser = async (email: string) => {
    const userDocCollection = firestoreApp.collection('users')
    console.log(email)
    const userDocQuery = userDocCollection.doc(email)
    const doc = await userDocQuery.get()
    return doc
}

export const createUser = async (email: string) => {
    const userDocCollection = firestoreApp.collection('users')
    const newUserData = {...userDataFields, name: email.split("@")[0]}
    await userDocCollection.doc(email).set(newUserData)
    return newUserData
}
interface ChangeUserDataRequestBody {
    name?: string,
    avatar?: string,
    theme?: string
}

export const updateUser = async (email: string, body: ChangeUserDataRequestBody) => {
    const userDoc = firestoreApp.collection('users').doc(email)
    const updateUserQueryResponse = await userDoc.update(body).catch(error => error as Error)
    console.log(updateUserQueryResponse)
    if (updateUserQueryResponse instanceof Error) {
        return updateUserQueryResponse.message
    }
    return updateUserQueryResponse
}