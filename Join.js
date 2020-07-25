class Join {
    static async join(data){
        let join = await data.map( async (element) => {
            let newElement = element;
            let student = await data.filter(object => object.matricula == element.matricula)
            if(student[0].nota != undefined && student[1].nota != undefined) {
                console.log('teste')
                newElement.media = (parseFloat(student[0].nota) + parseFloat(student[1].nota))/2;
                //console.log(newState.media)
            }
            return newElement;
        });
        return join;
    }
}

module.exports = Join;