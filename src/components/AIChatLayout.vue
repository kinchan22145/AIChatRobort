<template>
    <div style="width:100%;height:100%">
        <div class="chat-shower-container">
            <AIChatShower :bus="bus" />
        </div>
        <div class="chat-sender-container">
            <AIChatSender :bus="bus" />
        </div>
    </div>
</template>

<script>
import AIChatShower from "./AIChatShower.vue";
import AIChatSender from "./AIChatSender.vue";
import Vue from "vue"
    export default {
        data() {
            return {
                bus:new Vue()
            }
        },
        components:{
            AIChatShower,
            AIChatSender
        }
    }
</script>

<style lang="scss" scoped>
    .chat-shower-container{
        height: 70%;
        width: 100%;
        border-bottom: 1px #EDEDED solid;
        // padding:3px
    }
    .chat-sender-container{
        height: 30%;
        width: 100%;
    }
</style>