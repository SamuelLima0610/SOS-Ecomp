//const Write = require('./Write');

class First{
    static First(data){
        //let write = new Write();
        let array = [];
        data.forEach(object => {
            let nameFilter = data.filter(element => element.nome == object.nome);
            if(array.indexOf(nameFilter[0]) == -1) array.push(nameFilter[0]);
        });
        return array;
        //write.write('./teste.csv',array);
    }
}

module.exports = First;