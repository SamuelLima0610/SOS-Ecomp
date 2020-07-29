class OnlyComputation {

    static  async ComputerEngineer(materia1 , materia2){
        let list = []
        await materia1.forEach( async (element) => {
            let programacao = await materia2.filter(look => element.matricula == look.matricula)
            if(programacao.length == 1){
                let isRepeat = await list.filter(look => element.matricula == look.matricula)
                if(isRepeat.length <= 0) {
                    //list.push(programacao[0])
                    list.push(element)
                }
            }
        });
        return list;
    }
    
}

module.exports = OnlyComputation;