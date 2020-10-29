import {Schema, type, MapSchema} from "@colyseus/schema"
import { retrieveUser } from "../../api/users/model"
import { BingoBoard } from "./BingoBoard"

export interface PlayerInterface extends Schema{
    id: string
    wins: number
    board: BingoBoard
}

export class Player extends Schema {

    @type("string")
    id: string

    @type("string")
    email: string

    @type("string")
    name: string

    @type("string")
    avatar: string

    @type("int16")
    wins: number

    @type({map: BingoBoard})
    board: MapSchema<BingoBoard>

    constructor(playerId: string, email: string) {
        super()
        this.id = playerId
        this.email = email
        this.wins = 0
        this.board = new MapSchema<BingoBoard>()
    }

    async populateProfileDetails() {
        const userDoc = await retrieveUser(this.email)
        this.name = userDoc.data().name
        this.avatar = userDoc.data().avatar
    }
}