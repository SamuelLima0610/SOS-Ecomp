const fs = require('fs');
const util = require('util');

class Write {
    constructor(){
        this.writer = util.promisify(fs.writeFile);
    }
    async write(filepath, data){
        try{
            let id = 0
            let write = await data.map(element => {
                if(id == 0) return `${id},${element.matricula},${element.repeat},${element.nota}\r\n${++id}`
                else return `${element.matricula},${element.repeat},${element.nota}\r\n${++id}`
            });
            //`${element.semestre},${element.matricula},${element.nome},${element.media},${element.aprovacao},${element.reprovadoFalta}\r\n`
            await this.writer(filepath,write);
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = Write;
