class Join {
    static async join(data){
        let togheter = await data.map( (element) => {
            let newElement = element;
            let student = data.filter(object => object.matricula == element.matricula)
            if(student[0].nota != undefined && student[1].nota != undefined){
                newElement.media = (parseFloat(student[0].nota) + parseFloat(student[1].nota))/2
            }
            if(student[0].resultado != undefined && student[1].resultado != undefined ){
                let aprovado = 0;
                let reprovadoFalta = 0;
                if(student[0].resultado === 'APROVADO POR MÉDIA FINAL' || student[0].resultado === 'APROVADO'){
                    aprovado++ 
                } 
                if(student[1].resultado === 'APROVADO POR MÉDIA FINAL' || student[1].resultado === 'APROVADO'){
                    aprovado++ 
                } 
                if(student[0].resultado === 'REPROVADO POR FALTA'){
                    reprovadoFalta++ 
                } 
                if(student[1].resultado === 'REPROVADO POR FALTA'){
                    reprovadoFalta++ 
                } 
                newElement.aprovacao = (aprovado / 2);
                newElement.reprovadoFalta = (reprovadoFalta / 2);
            }
            return newElement;
        });
        return togheter;
    }
}

module.exports = Join;