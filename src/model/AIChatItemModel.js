import getUUID from "../utils/UUIDUtils.js";

export default class AIChatItemModel{
    constructor(msg){
        this.key = getUUID();
        this.value = convertLineBreake(deleteScriptInsert(msg.value));
        this.isMe = msg.isMe===undefined?true:msg.isMe;
    }

    
}

function convertLineBreake(msg){
    if(typeof(msg)==='string'){
      var operatorLineBreake = '\\n';
      return msg.replace(new RegExp(operatorLineBreake,'g'),'</span><br/><span>');
    }
}

function deleteScriptInsert(msg){
    if(typeof(msg)==='string'){
        var a = msg.replace(new RegExp('<','g'),'&lt;')
        return a.replace(new RegExp('>','g'),'&gt;');
      }
}