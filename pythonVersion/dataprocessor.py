import csv
def file_reader(filename):
    with open(filename) as csv_file:
        csv_reader = csv.reader(csv_file,delimiter=',')
        lista = []
        for row in csv_reader:
            new_list = [row[0],row[1],row[3],row[4],row[5]]
            lista.append(new_list)
    return lista

def file_reader2(filename):
    with open(filename) as csv_file:
        csv_reader = csv.reader(csv_file,delimiter=';')
        lista = []
        for row in csv_reader:
            new_list = [row[1],row[0],row[2],row[3],row[4]]
            lista.append(new_list)
    return lista

def all_occurrences(list):
    mat = {}
    for item in list:
        if(not item[1] in mat):
            mat[ item[1] ] = 1
        else:
            mat[ item[1] ]+=1
    return mat

def first_occurence(list):
    new_list = []
    ids = []
    for item in list:
        if(not (item[1] in ids)):
            new_list.append(item)
            ids.append(item[1])
    return new_list
        
def get_the_ids(subject):
    ids = []
    for i in subject:
        ids.append(i[1])
    return ids

def matriculated_at_the_first(alg, others):
    new_others = []
    for other in others:
        if(other[1] in alg):
            new_others.append(other)
    return new_others

def transform_into_dict(val):
    lista = {}
    for i in val:
        lista[ i[1] ] = {"faltas": i[2], "nota": i[3], "situacao":i[4]}     
    return lista   

def join_them_all(alg,calc,ga):
    all_of_them = []
    for i in alg:
        new_dict = {"matricula":i,"data": [] }
        new_dict["data"].append(alg[i])
        new_dict["data"].append(calc[i])
        new_dict["data"].append(ga[i])
        all_of_them.append(new_dict)
    return all_of_them

def calc_media(dictionary):
    qtd = 0
    nota = 0
    for i in dictionary:
        if(i["nota"]!="9999"):
            nota+=float(i["nota"])
            qtd+=1
    if(qtd==0):
        retorno = 9999
    else:
        retorno = nota/qtd
    return retorno

def calc_faltas_semestre(dictionary):
    faltas = 0
    for i in dictionary:
        for falta in i["faltas"]:
            faltas = faltas + int(falta)
    return faltas
    

def calc_porc_aprov_rep(dictionary):
    aprov=0
    rep = 0
    qtd =0
    for i in dictionary:
        if(i["situacao"]!=9999):
            if(i["situacao"] == "APROVADO POR MÉDIA FINAL" or i["situacao"] == "APROVADO"):
                aprov+=1
            elif(i["situacao"] == "REPROVADO POR FALTA"):
                rep+=1
            qtd+=1
    return (rep/qtd),(aprov/qtd)

#matricula #media #porc aprov #porc falt faltas
def new_csv_file(all_of_them):
    lista = []
    for i in all_of_them:
        perc_rep, perc_aprov = calc_porc_aprov_rep(i["data"])
        new_dict = {"matricula": i["matricula"], "mediaga":i["data"][2]['nota'],"mediacalculo":i["data"][1]['nota'], "mediaalg":i["data"][0]['nota'] , "aprov":perc_aprov,"rep":perc_rep, "faltas_semestre":calc_faltas_semestre(i["data"]) }
        lista.append(new_dict)
    return lista

def create_file(lista,calc_occurences, ga_occurences, alg_occurences):
    with(open('saida.csv','w')) as file:
        file.write('matricula, mediaga, mediacalculo, mediaalgoritmos, aprovacoes, reprovacoes_falta, faltas_semestre, semestres')
        file.write('\n')
        for i in lista:
            semest_calc = calc_occurences[i["matricula"]]
            semest_ga = ga_occurences[i["matricula"]]
            semest_alg = alg_occurences[i["matricula"]]
            faltas_semestre = str(i["faltas_semestre"])
            mediaga = i["mediaga"]
            mediacalculo = i["mediacalculo"]
            mediaalg = i["mediaalg"]
            aprov = "{:.2f}".format(i["aprov"])
            rep = "{:.2f}".format(i["rep"])
            file.write(i["matricula"]+","+mediaga+","+mediacalculo+","+mediaalg+","+aprov+","+rep+","+faltas_semestre+","+str(max(semest_calc,semest_alg,semest_ga)))
            file.write('\n')


#Read the files
algoritmos = file_reader('../algoritmos1.csv')
ga = file_reader('../ga.csv')
calculo = file_reader2('../CALCULO_novo.csv')

#Get the number of occurences of them
alg_occurences = all_occurrences(algoritmos)
ga_occurences = all_occurrences(ga)
calc_occurences = all_occurrences(calculo)

# Get the first occurence of them 
algoritmos = first_occurence(algoritmos)
ga = first_occurence(ga)
calculo = first_occurence(calculo)


#Get the algorithms ids
alg_ids = get_the_ids(algoritmos) 
ga_ids = get_the_ids(ga)


# Get only the computer students
ga = matriculated_at_the_first(alg_ids,ga)
calculo = matriculated_at_the_first(alg_ids,calculo)

#Get the persons matriculated also in G.A. file 
ga_ids = get_the_ids(ga)
algoritmos = matriculated_at_the_first(ga_ids,algoritmos)
calculo = matriculated_at_the_first(ga_ids,calculo)
print(len(algoritmos), " ", len(ga), " " ,len(calculo))

#Get the persons matriculated also in Calculum file 
calc_ids = get_the_ids(calculo)
algoritmos = matriculated_at_the_first(calc_ids,algoritmos)
ga = matriculated_at_the_first(calc_ids,ga)
print(len(algoritmos), " ", len(ga), " " ,len(calculo))

#transform into a dictionary
algoritmos = transform_into_dict(algoritmos)
ga = transform_into_dict(ga)
calculo = transform_into_dict(calculo)

all_of_them  = join_them_all(algoritmos,calculo,ga)

create_file(new_csv_file(all_of_them),calc_occurences,ga_occurences,alg_occurences)