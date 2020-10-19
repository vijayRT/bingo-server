import {Schema, type, MapSchema} from "@colyseus/schema"
import { BingoBoard } from "./BingoBoard"

export interface PlayerInterface extends Schema{
    id: string
    wins: number
    board: BingoBoard
}

export class Player extends Schema {

    @type("string")
    id: string

    @type("int16")
    wins: number

    @type({map: BingoBoard})
    board: MapSchema<BingoBoard>

    constructor(playerId: string) {
        super()
        this.id = playerId
        this.wins = 0
        this.board = new MapSchema<BingoBoard>()
    }
}