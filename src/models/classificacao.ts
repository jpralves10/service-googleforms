export interface IClassificacao {

    _id?: any
    idSheet: number,
    nmSheet: string,
    colunas: {
        idColuna: number,
        nmColuna: string 
    }[],
    respostas: {
        idResposta: string,
        carimbo: string,
        campos: {
            idColuna: number,
            deCampo: string
        }[]
    }[],
    comentarios: {
        idSheet: number,
        idComentario: number,
        idResposta: string,
        idColuna: number,
        idUsuario: string,
        status: string,
        descricao: string,
        dataCriacao: Date,
        dataAtualizacao: Date
    }[]
}

export class Classificacao implements IClassificacao {

    _id?: any
    idSheet = 0;
    nmSheet = '';
    colunas: {
        idColuna: number,
        nmColuna: string 
    }[] = [];
    respostas: {
        idResposta: string,
        carimbo: string,
        campos: {
            idColuna: number,
            deCampo: string
        }[]
    }[] = [];
    comentarios: {
        idSheet: number,
        idComentario: number,
        idResposta: string,
        idColuna: number,
        idUsuario: string,
        status: string,
        descricao: string,
        dataCriacao: Date,
        dataAtualizacao: Date
    }[] = []
}