import { Schema, type, MapSchema, ArraySchema } from "@colyseus/schema";
import { Player } from "./Player";

export class BingoRoomState extends Schema {
    @type({map: Player})
    players: MapSchema<Player>

    @type(["int16"])
    numbersPressed: ArraySchema<number>

    @type(Player)
    winner: Player

    constructor() { 
        super()
        this.players = new MapSchema<Player>()
        this.numbersPressed = new ArraySchema<number>()
    }
}