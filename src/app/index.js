import Vue from 'vue';
import App from "./App.vue";


// let outerData = {
//     msg:'i love u'
// }

// var app = document.getElementById("app");
var vue = new Vue({
    el:'#app',
    // data:{
    //     msg:'i love u'
    // }
    components:{
        App
    },
    render:
        (createElement => createElement('App'))
})
// .$mount('#app')

// vue.$mount()
// console.log(vue.$data);
// console.log(vue.$el);
window.vue = vue;