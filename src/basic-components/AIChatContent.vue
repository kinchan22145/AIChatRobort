<template>
    <span v-html="emoji()"></span>
</template>

<script>
import {emoji} from "../utils/EmojiUtils.js";
    
    export default {
        props:{
            value:{
                type:String,
                default:""
            }
        },
        inject: ["configSrc"],
        methods: {
            emoji() {
                return emoji(this.value, this.configSrc.getConfigByKey('useSprite'));
            }
        },
        mounted(){
            if(this.configSrc.getConfigByKey('useSprite')){
                require('../../asset/scss/emoji-sprite.scss');
            }
        }
    }
</script>

<style lang='scss'>

</style>