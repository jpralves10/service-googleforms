export interface IClassificacao {

    _id?: any
    idSheet: string,
    nmSheet: string,
    version: number,
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
        nmUsuario: string,
        status: string,
        descricao: string,
        dataCriacao: Date,
        dataAtualizacao: Date
    }[]
}

export class Classificacao implements IClassificacao {

    _id?: any
    idSheet = '';
    nmSheet = '';
    version = 0;
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
        nmUsuario: string,
        status: string,
        descricao: string,
        dataCriacao: Date,
        dataAtualizacao: Date
    }[] = []
}