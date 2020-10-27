import {Schema, type} from "@colyseus/schema"   

export class BingoCell extends Schema {

    @type("string")
    displayedValue: string;

    @type("boolean")
    struck: boolean;

    constructor(displayedValue: string) {
        super()
        this.displayedValue = displayedValue
        this.struck = false
    }
}