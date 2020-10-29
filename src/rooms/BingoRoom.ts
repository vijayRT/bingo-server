import { Room, Client } from "colyseus";
import { retrieveUser } from "../api/users/model";
import { BingoRoomState } from "./schema/BingoRoomState";
import { Player, PlayerInterface } from "./schema/Player";

export class BingoRoom extends Room<BingoRoomState> {
    onCreate(options: any) {
        console.log("Hi Im here");
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
        this.state.players.set(email, joinedPlayer);
        this.broadcast("playerJoined");
    }

    onLeave(client: Client, consented: boolean) {}

    onDispose() {}
}
