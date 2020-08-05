class Join {
    static async join(data){
        let together = await data.map( (element) => {
            let newElement = element;
            let student = data.filter(object => object.matricula == element.matricula)
            if(student[0].nota != undefined && student[1].nota != undefined && student[2].nota != undefined ){
                divisao = 0
                total = 0;
                if(parseFloat(student[0].nota) <=10){
                    total+=parseFloat(student[0].nota);
                    divisao+=1;
                }
                if(parseFloat(student[1].nota) <=10){
                    total+=parseFloat(student[1].nota);
                    divisao+=1;
                }
                if(parseFloat(student[2].nota) <=10){
                    total+=parseFloat(student[2].nota);
                    divisao+=1;
                }
                if(divisao!=0){
                    newElement.media = total/divisao;
                }else{
                    newElement.media = -1;
                }
            }
            if(student[0].resultado != undefined && student[1].resultado != undefined  && student[2].resultado != undefined ){
                let aprovado = 0;
                let reprovadoFalta = 0;
                if(student[0].resultado === 'APROVADO POR MÉDIA FINAL' || student[0].resultado === 'APROVADO'){
                    aprovado++ 
                } 
                if(student[1].resultado === 'APROVADO POR MÉDIA FINAL' || student[1].resultado === 'APROVADO'){
                    aprovado++ 
                } 
                if(student[2].resultado === 'APROVADO POR MÉDIA FINAL' || student[2].resultado === 'APROVADO'){
                    aprovado++ 
                } 
                if(student[0].resultado === 'REPROVADO POR FALTA'){
                    reprovadoFalta++ 
                } 
                if(student[1].resultado === 'REPROVADO POR FALTA'){
                    reprovadoFalta++ 
                } 
                if(student[2].resultado === 'REPROVADO POR FALTA'){
                    reprovadoFalta++ 
                } 
                newElement.aprovacao = (aprovado / 3);
                newElement.reprovadoFalta = (reprovadoFalta / 3);
            }
            return newElement;
        });
        return together;
    }
}

module.exports = Join;