import { Room, Client } from "colyseus";
import { BingoRoomState } from "./schema/BingoRoomState";
import { Player, PlayerInterface } from "./schema/Player";

export class BingoRoom extends Room<BingoRoomState> {
    onCreate(options: any) {
        this.setState(new BingoRoomState());
        this.onMessage("numberPress", (client, message) => {
            this.state.numbersPressed.push(message.numberPressed)
            let player: PlayerInterface = this.state.players[client.sessionId]
            player.board.cells[message.numberIndex].struck = true
        });
        this.onMessage("bingoPress", (client, message) => {
            
        })
    }

    onJoin(client: Client, options: any) {
        this.state.players[client.sessionId] = new Player(client.sessionId)
    }

    onLeave(client: Client, consented: boolean) {
    }

    onDispose() {
    }

}
