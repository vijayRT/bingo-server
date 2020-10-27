import { Room, Client } from "colyseus";
import { BingoRoomState } from "./schema/BingoRoomState";
import { Player, PlayerInterface } from "./schema/Player";

export class BingoRoom extends Room<BingoRoomState> {
    onCreate(options: any) {
        this.setState(new BingoRoomState());
        this.onMessage("numberPress", (client, message) => {
            console.log(JSON.stringify(message, undefined, 4))
        });
        this.onMessage("bingoPress", (client, message) => {
            console.log(JSON.stringify(message, undefined, 4))
        })
    }

    onJoin(client: Client, options: any) {
        // this.state.players[client.sessionId] = new Player(client.sessionId)
    }

    onLeave(client: Client, consented: boolean) {
    }

    onDispose() {
    }

}
