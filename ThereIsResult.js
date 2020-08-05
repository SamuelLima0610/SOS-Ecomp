class ThereIsResult{
    static isResult(data){
        data.forEach(element => {
            console.log(element)
            switch(element.resultado){
                case 'APROVADO POR MÉDIA FINAL':
                case 'APROVADO':
                case 'REPROVADO':
                //case 'REPROVADO POR FALTA':
                //case 'REPROVADO POR NOTA':
                case 'DISPENSADO':
                case 'TRANCAMENTO':
                case 'REPROVADO POR MÉDIA FINAL': break;
                default:
                    console.log(element.matricula + '-' + element.resultado);
                    break;
                    
            }
        });
    }
}

module.exports = ThereIsResult;