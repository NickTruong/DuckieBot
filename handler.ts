import { Message } from "discord.js"

export class Handler
{
    constructor(){}

    parseCode(str: string, command: string) {
        return str.substring(str.indexOf(command) + command.length)
    }

    run(msg: Message) {
        let code = this.parseCode(msg.content, "run")
        msg.reply(code)
    }
}
