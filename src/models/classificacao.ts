export interface Classificacao {

    _id?: any
    idSheet: number,
    nmSheet: string,
    colunas: [{
        idColuna: number,
        nmColuna: string 
    }],
    respostas: [{
        idResposta: string,
        carimbo: string,
        campos: [{
            idColuna: string,
            idCampo: string,
            deCampo: string
        }]
    }]
    comentarios: [{
        idComentario: string,
        idResposta: string,
        idColuna: string,
        idCampo: string,
        status: string;
        descricao: string;
    }]
}