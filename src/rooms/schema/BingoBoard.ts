import {Schema, ArraySchema, type} from "@colyseus/schema"
import {BingoCell} from "./BingoCell"
export class BingoBoard extends Schema {

    @type(["string"])
    numbers: ArraySchema<string>

    @type([BingoCell])
    cells: ArraySchema<BingoCell>

    @type(["boolean"])
    bingoStatus: ArraySchema<boolean>

    constructor() {
        super()
        const ARRAY_LENGTH = 25
        this.cells = new ArraySchema<BingoCell>()
        this.bingoStatus = new ArraySchema<boolean>()
        for (let i = 0; i < 5; i++) {
            this.bingoStatus.push(false)
        }
        for(let i = 0; i < ARRAY_LENGTH; i++) {
            const number = (Math.floor(Math.random() * 25) + 1).toString()
            this.numbers.push(number)
            this.cells.push(new BingoCell(number))
        }
    }
}