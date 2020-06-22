"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = __importStar(require("discord.js"));
var handler_1 = require("./handler");
var config_1 = require("./config");
var client = new Discord.Client();
var handler = new handler_1.Handler();
client.on('ready', function () {
    console.log("Logged in as " + client.user.tag + "!");
});
client.on('message', function (msg) {
    if (msg.author.id + msg.author.tag === client.user.id + client.user.tag)
        return;
    if (msg.content[0] === "$") {
        var split = msg.content.substr(1).split(" ");
        switch (split[0]) {
            case "run":
                handler.run(msg, split[1]);
                break;
            default:
                msg.reply("\"" + split[0] + "\"" + " is an invalid command.");
                break;
        }
    }
});
client.login(config_1.config.token);
