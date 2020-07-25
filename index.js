const Read = require('./Reader');
const Processor = require('./Processor');
const First = require('./First');
const Write = require('./Write');
const Join = require('./Join');
const OnlyComputation = require('./OnlyComputation');

async function main(){
    let reader = new Read(); //leitor do arquivo
    let write = new Write(); //objeto para escrita do arquivo
    let ga = await reader.read('./ga.csv'); //ler o arquivo das informações da materia geometria analitca
    //let calculo = await reader.read('./CALCULO.csv');
    let algoritmos1 = await reader.read('./algoritmos1.csv'); //ler o arquivo das informações da materia algoritmos I
    //processa a informação e coloca em um vetor de JSON
    ga = Processor.Process(ga); 
    //calculo = Processor.Process(calculo);
    algoritmos1 = Processor.Process(algoritmos1);
    //Pega só as notas da primeira vez que a pessoa cursou
    ga = First.First(ga);
    algoritmos1 = First.First(algoritmos1);
    //pega os alunos de computacao
    let computation = await OnlyComputation.ComputerEngineer(ga,algoritmos1);
    let join = await Join.join(computation);
    write.write('./teste.csv', join);
}

main();