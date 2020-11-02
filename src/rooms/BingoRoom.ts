import { Room, Client } from "colyseus";
import { retrieveUser } from "../api/users/model";
import { BingoRoomState } from "./schema/BingoRoomState";
import { Player, PlayerInterface } from "./schema/Player";

export class BingoRoom extends Room<BingoRoomState> {
    onCreate(options: any) {
        this.setState(new BingoRoomState());
        this.onMessage("numberPress", (client, message) => {
            console.log(JSON.stringify(message, undefined, 4));
        });
        this.onMessage("bingoPress", (client, message) => {
            console.log(JSON.stringify(message, undefined, 4));
        });
    }

    async onJoin(client: Client, options: any) {
        const email: string = options.email;
        const joinedPlayer = new Player(client.sessionId, email);
        await joinedPlayer.populateProfileDetails();
        this.state.players.set(client.sessionId, joinedPlayer);
        this.broadcast("playerJoined");
    }

    onLeave(client: Client, consented: boolean) {
        this.state.players.delete(client.sessionId)
    }

    onDispose() {}
}
