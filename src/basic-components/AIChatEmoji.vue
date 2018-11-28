<template>
  <div class="emoji">
    <ul class="emoji-controller">
      <li 
        v-for="(pannel,index) in pannels" 
        @click="changeActive(index)"
        :class="{'active': index === activeIndex}"
        :key="pannel">
        {{ pannel }}</li>
    </ul>
    <ul class="emoji-container">
      <li 
        v-for="(emojiGroup, index) in emojis" 
        style="padding: 0" 
        :key="index"
        v-if="index === activeIndex">
        <a 
          v-for="(emoji, index) in emojiGroup"  
          :key="index" @click.prevent="selectItem(emoji)">
           <span 
              class="emoji-item"
              :title="emoji"
              :class="'sprite-' + getPureName(emoji)"></span>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import emojiData from '../data/emoji-data.js'

export default {
  name: 'emoji',
  data () {
    return {
      emojiData: emojiData,
      pannels: ['表情', '自然', '物品', '地点', '符号'],
      activeIndex: 0
    }
  },
  methods: {
    changeActive (index) {
      this.activeIndex = index
    },
    getPureName (name) {
      return name.replace(/:/g, '')
    },
    selectItem (emoji) {
      this.$emit('select', emoji)
    }
  },
  computed: {
    emojis () {
      return this.pannels.map(item => {
        return Object.keys(this.emojiData[item])
      })
    }
  }
}
</script>

<style lang='scss' scoped>
// @import '../../asset/scss/emoji-sprite.scss';

.emoji {
  width: 380px;
  height: 186px;
  bottom: 30px;
  background: #fff;
  z-index: 10;
  padding: 10px;

  ul{
    padding-left: 0px;
    margin-top: 0px;
  }
  .emoji-controller {
    height: 36px;
    overflow: hidden;
    margin-bottom: 0;
    list-style-type: none;
    li {
      float: left;
      width: 76px;
      font-size: 12px;
      line-height: 36px;
      cursor: pointer;
      text-align: center;
      position: relative;
      &.active::after{
        content: '';
        width: 100%;
        height: 1px;
        background: #0689dd;
        left: 0;
        bottom: 4px;
        position: absolute;
      }
    }
  }
  .emoji-container {
    height: 140px;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    li {
      font-size: 0;
      padding: 5px;
      a {
        float: left;
        overflow: hidden;
        height: 35px;
        transition: all ease-out .2s;
        border-radius: 4px;
        &:hover {
          background-color: #d8d8d8;
          border-color: #d8d8d8;
        }
        span {
          width: 25px;
          height: 25px;
          display: inline-block;
          border: 1px solid transparent;
          cursor: pointer;
        }
      }
    }

    
        &::-webkit-scrollbar{
            width: 10px;
            border-radius: 10px;
        }

        &::-webkit-scrollbar-thumb{
            background: #D2D2D2;
            border-radius: 10px
        }
  }
}
</style>
