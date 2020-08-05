const fs = require('fs');
const util = require('util');

class Write {
    constructor(){
        this.writer = util.promisify(fs.appendFile);
    }
    async write(filepath, data){
        try{
            let write = await data.map(element => await this.writer(filepath, `${element.semestre},${element.matricula},${element.media},${element.resultado}\n` ,function(err){ if(err) throw err;}));
            //`${element.semestre},${element.matricula},${element.nome},${element.media},${element.aprovacao},${element.reprovadoFalta}\r\n`
            //data.push(write);
            //await this.writer(filepath,write);
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = Write;
