const path = require('path');
const fs = require('fs');

module.exports.moveFile = function (src, des, isClean) {
    
    if (!fs.existsSync(src)) return;
    const srcIsDir = fs.statSync(src).isDirectory();
    if (fs.existsSync(des)) {
        isClean && cleanFolder(des);
    } else {
        fs.mkdirSync(des);
    }
    if (srcIsDir) {
        fs.readdirSync(src).forEach(f => {
            fs.statSync(src+'\\'+f).isDirectory()?this.moveFile(src+'\\'+f, des+'\\'+f, false):this.moveFile(src+'\\'+f, des, false);
        });
    } else {
        let fileName = src.substr(src.lastIndexOf('\\'))
        let data = fs.readFileSync(src);
        fs.writeFileSync(des + '\\' + fileName, data);
    }
}

cleanFolder = function (path) {
    if (fs.existsSync(path)) {
        let files = fs.readdirSync(path);
        files.forEach(f => deleteFile(path+'\\'+f));
    }
}

deleteFile = function (path) {
    console.log('delete: '+path);
    if (fs.existsSync(path)) {
        if (fs.statSync(path).isDirectory()) {
            cleanFolder(path);
            fs.rmdirSync(path);
        } else {
            fs.unlinkSync(path);
        }
    }
}