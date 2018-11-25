import getUUID from "../utilis/UUIDUtilis.js";

export default class AIChatItemModel{
    constructor(msg){
        this.key = getUUID();
        this.value = msg.value;
        this.isMe = msg.isMe===undefined?true:msg.isMe;
    }
}