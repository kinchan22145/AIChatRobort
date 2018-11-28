<template>
    <div class="chat-shower">
        <div class="chat-items-container" >
            <AIChatItem v-for="item of chatItemList" :key="item.key" :isMe="item.isMe">
                <AIChatContent :value="item.value" />
            </AIChatItem>
        </div>
    </div>
</template>

<script>
    import AIChatItem from "../basic-components/AIChatItem.vue";
    import AIChatContent from "../basic-components/AIChatContent.vue";
    import AIChatItemModel from "../model/AIChatItemModel.js";
    export default {
        props: ['bus'],
        data() {
            return {
                chatItemList:[]
            }
        },
        methods: {
            isScroll() {
                let outterEl = this.$el;
                if(outterEl){
                    let innerEl = outterEl.firstElementChild;
                    if(innerEl){
                        return outterEl.clientHeight<innerEl.offsetHeight;
                    }
                }
                return false;
            }
        },
        mounted(){
            this.bus.$on('onMsg',(msg)=>{
                if(msg instanceof Promise){
                    msg.then(v=>{
                        this.chatItemList.push(new AIChatItemModel(v))
                        this.$nextTick(()=>{
                            this.$el.scrollTop = this.$el.scrollHeight;
                        })
                    })
                }
            });
        },
        components:{
            AIChatItem,
            AIChatContent
        }
    }
</script>

<style lang="scss" scoped>
    .chat-shower{
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        background: #EEEEEE;
        

        .chat-items-container{
            height: max-content;
            width: 100%;
            background: inherit;
        }

        .normal-container{
            width: calc(100% - 10px);
        }

        .scroll-container{
            width: 100%;
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
</style>