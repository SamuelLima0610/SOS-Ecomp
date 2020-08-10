//const Write = require('./Write');

class First{
    static First(data){
        //let write = new Write();
        let array = [];
        data.forEach(object => {
            let nameFilter = data.filter(element => element.matricula == object.matricula);
            if(array.indexOf(nameFilter[0]) == -1){
                let firstPeriod = nameFilter[0];
                firstPeriod.repeat = nameFilter.length
                array.push(firstPeriod)
            } 
        });
        return array;
        //write.write('./teste.csv',array);
    }
}

module.exports = First;