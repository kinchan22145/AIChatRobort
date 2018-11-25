<template>
    <div class="icon-container">
        <img :src="imgUrl"/>
    </div>
</template>

<script>
    export default {
        props:{
            imgUrl:{
                default:undefined
            }
        }
    }
</script>

<style lang="scss" scoped>
    .icon-container{
        width: 50px;
        height: 50px;
        border-radius: 50px;

        img{
            width: 100%;
            height: 100%;
        }
    }
</style>