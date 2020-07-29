const fs = require('fs');
const util = require('util');

class Write {
    constructor(){
        this.writer = util.promisify(fs.writeFile);
    }
    async write(filepath, data){
        try{
            let write = await data.map(element => `${element.semestre},${element.matricula},${element.nota},${element.resultado}\n`);
            //`${element.semestre},${element.matricula},${element.nome},${element.media},${element.aprovacao},${element.reprovadoFalta}\r\n`
            //data.push(write);
            await this.writer(filepath,write);
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = Write;