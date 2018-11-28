const f = require('./move-file');
const path = require('path');


f.moveFile(path.resolve(__dirname,'dist'),'D:\\apache-tomcat-8.5.32\\apache-tomcat-8.5.32\\webapps\\myVue',true);