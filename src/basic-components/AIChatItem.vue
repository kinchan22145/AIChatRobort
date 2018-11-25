<template>
    <div>
        <div class='chat-component' :class="{'is-me':isMe}">
            <AIChatIcon class="icon" :imgUrl="icon"/>
            <div class='chat-tri'><span></span></div>
            <div class='chat-msg'>{{msg}}</div>
        </div>
    </div>
</template>

<script>
import AIChatIcon from './AIChatIcon.vue'
const iconMap = {
  me:require('../../asset/img/my-icon.jpg'),
  ai:require('../../asset/img/ai-icon.jpg'),
}
export default {
  name: "AIChatItem",
  data() {
    return {
      chatHeight: "50px"
    };
  },
  props: {
    isMe: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String
    }
  },
  computed: {
    icon() {
      return this.isMe?iconMap.me:iconMap.ai; 
    }
  },
  components:{
    AIChatIcon
  }
};
</script>

<style lang='scss' scoped>
.chat-component {
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  &.is-me {
    flex-direction: row-reverse;

    .chat-msg {
      background: #98E165;
      border: none
    }
    .chat-tri{
      border-left: 10px #98E165 solid;
      border-right: none;

      span{
        display: none;
      }
    }
  }

  .icon {
    margin: 10px 20px;
  }
  .chat-msg {
    max-width: 300px;
    display: inline-block;
    background: #FFFFFF;
    border-radius: 3px;
    position: relative;
    top:20px;
    padding:10px;
    font-size: 14px;
    border: 1px #EDEDED solid;
  }

  .chat-tri{
    height: 0px;
    width: 0px;
    position: relative;
    top:30px;
    z-index: 10;
    border-right: 10px #EDEDED solid;
    border-top: 8px transparent solid;
    border-bottom: 8px transparent solid;

    span{
      height: 0px;
      width: 0px;
      top:-8px;
      left: 1px;
      position: absolute;
      border-right: 10px #FFFFFF solid;
      border-top: 8px transparent solid;
      border-bottom: 8px transparent solid;
    }
  }
}
</style>