import { Message } from "discord.js";
import fetch from "node-fetch";

// http://api.paiza.io:80/runners/create?source_code=test&language=c&input=inputtest&longpoll=false&longpoll_timeout=100&api_key=guest

const base_url = "http://api.paiza.io:80";

interface Create {
    source_code: string,
    language: string,
    input?: string,
    longpoll?: string,
    longpoll_timeout?: string
}

interface GetStatus {
    id: string
}

interface GetDetails {
    id: string
}

export class Handler
{
    public requests: Map<string, Message> = new Map();
    public request_limit: Number = 5;
    public delay: Number = 3000;

    constructor() {}

    parseCode(str: string, language: string) {
        return str.substring(str.indexOf(language) + language.length + 1);
    }

    async run(message: Message, language: string) {
        let code = this.parseCode(message.content, language);
        let request: Create = {
            source_code: code,
            language: language
        };
        let id: string = "";
        let response = await this.createRunner(request, message)
        if(!response.ok) return;
        await response.json().then(json => {
            id = json.id;
            this.requests.set(json.id, message);
        });
        while(this.requests.has(id)) {
            let status: string = "";
            let response = await this.getStatus(id);
            if(!response.ok) return;
            await response.json().then(json => {
                status = json.status;
            })
            if(status === "completed") break;
            setTimeout(() => {}, 3000);
        }
        response = await this.getDetails(id);
        await response.json().then(json => {
            this.requests.delete(id);
            console.log(json);
            (json.build_stdout)? message.channel.send(json.build_stdout) : null;
            (json.build_stderr)? message.channel.send(json.build_stderr) : null;
            (json.stdout)? message.channel.send(json.stdout) : null;
            (json.stderr)? message.channel.send(json.stderr) : null;
        })
    }

    // base_url + "/runners/create?" + 
    // "source_code=" + request.source_code + 
    // "&language=" + request.language + 
    // ((request.input != null)? "&input=" + request.input : "") + 
    // ((request.longpoll != null)? "&longpoll=" + request.longpoll : "") +
    // ((request.longpoll_timeout != null)? "&longpoll_timeout=" + request.longpoll_timeout : "") +
    // "&api_key=guest"

    createRunner(request: Create, message: Message) {
        const myURL = new URL(base_url + "/runners/create");
        myURL.searchParams.set("source_code", request.source_code);
        myURL.searchParams.set("language", request.language);
        myURL.searchParams.set("api_key", "guest");
        (request.input !== null)? myURL.searchParams.set("input", request.input!) : null;
        (request.longpoll !== null)? myURL.searchParams.set("longpoll", request.longpoll!) : null;
        (request.longpoll_timeout !== null)? myURL.searchParams.set("longpoll_timeout", request.longpoll_timeout!) : null;
        return fetch(myURL,
            {
                method: "POST"
            }
        );
    }

    getStatus(id: string) {
        return fetch(base_url + "/runners/get_status?" +
            "id=" + id +
            "&api_key=guest",
            {
                method: "GET"
            }
        );
    }

    getDetails(id: string) {
        return fetch(base_url + "/runners/get_details?" +
            "id=" + id +
            "&api_key=guest",
            {
                method: "GET"
            }
        );
    }
}
