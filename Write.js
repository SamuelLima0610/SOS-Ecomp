const fs = require('fs');
const util = require('util');

class Write {
    constructor(){
        this.writer = util.promisify(fs.writeFile);
    }
    async write(filepath, data){
        try{
            let write = data.map(element => `${JSON.stringify(element)}\r\n`);
            await this.writer(filepath,write);
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = Write;