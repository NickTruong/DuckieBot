import * as Discord from "discord.js";
import { Handler } from "./handler";
import { config } from "./config";

const client = new Discord.Client();
const handler = new Handler();

client.on('ready', () => {
    console.log(`Logged in as ${client.user!.tag}!`);
});

client.on('message', msg => {
    if(msg.author.id + msg.author.tag === client.user!.id + client.user!.tag)
        return
    
    if(msg.content[0] === "$") {
        let split = msg.content.substr(1).split(" ")
        switch(split[0]) {
            case "run":
                handler.run(msg, split[1]);
                break;
            default:
                msg.reply("\"" + split[0] + "\"" + " is an invalid command.");
                break;
        }
    }
});

client.login(config.token);
