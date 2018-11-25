<template>
    <div class="chat-sender">
        <AIChatInput class="chat-input" ref="input" v-model="sentence" :disabled="disableInput" @clickEnter="sendMsg"/>
        <button class="chat-sender-button" @click="sendMsg()">发送</button>
    </div>
</template>

<script>
import AIChatInput from "../basic-components/AIChatInput.vue";
export default {
  props: ["bus"],
  data() {
    return {
      sentence: "",
      disableInput: false
    };
  },
  methods: {
    test(){
        console.log("abc")
    },
    sendMsg() {
      // debugger;
      if (this.disableInput === false) {
        this.disableInput = true;
        let reqrestion = this.sentence;
        this.sentence = "请耐心等待小a的回答。。。"
        this.bus.$emit("onMsg",
            new Promise((res, rej) => {
                res({ value: reqrestion, isMe: true });
            })
        );
        var requestAnwser = new Promise((res, rej) => {
          var form = new FormData();
          form.append("cmd", "chat");
          form.append("appid", "02013149566a8f0769829af185c79613");
          form.append("userid", "mandy");
          form.append("text", this.reqrestion);

          var request = new XMLHttpRequest();
          request.open(
            "POST",
            "http://idc.emotibot.com/api/ApiKey/openapi.php"
          );
          // request.setRequestHeader("content-type","multipart/form-data");
          request.send(form);
          request.onreadystatechange = () => {
            if (request.readyState == 4) {
              if (request.status == 200) {
                var response = JSON.parse(request.responseText);
                if (response.return === 0) {
                  res({ value: response.data[0].value, isMe: false });
                }
              }
            }
          };
        });
        this.bus.$emit("onMsg", requestAnwser);
        requestAnwser.then(v=>{
            this.sentence = "";
            this.disableInput = false;
            this.$refs.input.focusInput();
        })
      }
    }
  },
  components: {
    AIChatInput
  }
};
</script>

<style lang="scss" scoped>
.chat-sender {
  height: 100%;
  width: 100%;
    background: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;

  .chat-input {
    width: calc(100% - 10px);
    height: calc(90% - 30px);
    min-height: 30px;
    padding: 5px;
  }

  .chat-sender-button {
    float: right;
    background: #F5F5F5;
    position: relative;
    width: 80px;
    right: 20px;
    bottom: 10px;
    border: 1px #EDEDED solid;

    &:hover{
        background: #129611;
        color: white;
        border: none;
    }
  }
}
</style>