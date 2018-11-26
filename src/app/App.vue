<template>
    <div style="width:100%;height:100%">
        <AIChatLayout />
    </div>
</template>

<script>
import AIChatLayout from "../components/AIChatLayout.vue";
import ConfigService from "../service/config.service.js";

export default{
    name:'App',
    data() {
        return {
        }
    },
    provide: function () {
        return {
            configSrc: new ConfigService()
        }
    },
    components:{
        AIChatLayout
    }
}
</script>

<style scoped>

</style>