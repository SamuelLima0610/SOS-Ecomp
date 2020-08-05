class Processor {
    static Process(data){
        let split = data.split('\r\n');
        let rows = [];
        split.forEach(element => {
            let row = element.split(',');
            let json = {
                semestre: row[0],
                matricula: row[1],
                nome: row[2],
                faltas: row[3],
                nota: row[4],
                resultado: row[5]
            }
            rows.push(json);
        });
        return rows;
    }
    static ProcessCalculo(data){
        let split = data.split('\n');
        let rows = [];
        split.forEach(element => {
            let row = element.split(';');
            let json = {
                matricula: row[0],
                semestre: row[1],
                faltas: row[2],
                nota: row[3],
                resultado: row[4]
            }
            rows.push(json);
        });
        return rows;
    }
}

module.exports = Processor