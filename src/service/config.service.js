export default class ConfigService{

    constructor(){
        this.configCahe = null;
        this.loadConfig();
    }

    loadConfig(){
        let xhr = new XMLHttpRequest();
        xhr.open('GET','app.config.json',false);
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState === 4){
                this.configCahe = JSON.parse(xhr.response);
            }
        }
        xhr.send();
    }

    getConfigByKey(key){
        if(this.configCahe===null){
            this.loadConfig();
        }
        // console.log(this.configCahe);
        return this.configCahe[key];
    }
}