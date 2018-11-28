<template>
    <div class="chat-sender"> 
      <div class="bar" >
        <i class="bar-item fa fa-smile-o" aria-hidden="true" @click="showEmoji = !showEmoji"></i>     
        <transition name="fade" mode="">
        <div class="emoji-box" :class="{'show-top':emojiBoxPosition()}" v-if="showEmoji" >
            <vue-emoji
              @select="selectEmoji">
            </vue-emoji>
        </div>       
      </transition>
      </div>
        <AIChatInput class="chat-input" ref="input" v-model="sentence" :disabled="disableInput" @clickEnter="sendMsg"/>
        <button class="chat-sender-button" @click="sendMsg()">发送</button>
    </div>
</template>

<script>
import AIChatInput from "../basic-components/AIChatInput.vue";
import vueEmoji from "../basic-components/AIChatEmoji.vue";

export default {
  props: ["bus"],
  data() {
    return {
      sentence: "",
      disableInput: false,
      showEmoji: false
    };
  },
  inject: ["configSrc"],
  methods: {    
    selectEmoji (code) {
      this.showEmoji = false;
      this.sentence += code;
      this.$refs.input.focusInput();
    },
    emojiBoxPosition(){
      var barEl = this.$el.firstElementChild;
      return ((barEl.offsetTop+barEl.offsetHeight+206)<document.documentElement.clientHeight)?false:true;
    },
    sendMsg(e) {
      if (this.disableInput === false) {
        this.disableInput = true;
        let reqrestion = this.sentence;
        this.sentence = "请耐心等待小飞的回答。。。";
        this.bus.$emit(
          "onMsg",
          new Promise((res, rej) => {
            res({ value: reqrestion, isMe: true });
          })
        );
        var requestAnwser = new Promise((res, rej) => {
          var form = new FormData();
          form.append("cmd", "chat");
          form.append("appid", this.configSrc.getConfigByKey("appid"));
          form.append("userid", this.configSrc.getConfigByKey("userid"));
          form.append("text", reqrestion);

          var request = new XMLHttpRequest();
          request.open("POST", this.configSrc.getConfigByKey("url"));
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
        requestAnwser.then(v => {
          this.sentence = "";
          this.disableInput = false;
          this.$refs.input.focusInput();
        });
      }
    }
  },
  components: {
    AIChatInput,
    vueEmoji
  }
};


</script>

<style lang="scss" scoped>
.chat-sender {
  height: 100%;
  width: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;

  .bar {
    position: relative;
    height: 20%;
    width: 100%;
    min-height: 30px;
    max-height: 40px;

    .bar-item {
      cursor: pointer;
      display: inline-block;
      height: 30px;
      width: 30px;
      margin: auto 10px;
      font-size: 30px;
      color: gray;

      &:hover{
        color: orange;
      }
    }
    .emoji-box {
      position: absolute;
      z-index: 10;
      box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.2);
      background: white;

      &.show-top{
        bottom: 40px;
      }
    }
  }

  .chat-input {
    width: calc(100% - 10px);
    height: calc(80% - 30px);
    min-height: 30px;
    padding: 5px;
  }

  .chat-sender-button {
    float: right;
    background: #f5f5f5;
    position: relative;
    width: 80px;
    right: 20px;
    bottom: 10px;
    border: 1px #ededed solid;

    &:hover {
      background: #129611;
      color: white;
      border: none;
    }
  }
}

.clearfix {
  &:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-move {
  transition: transform 0.4s;
}

</style>