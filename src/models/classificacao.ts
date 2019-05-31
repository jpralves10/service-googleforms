export interface IClassificacao {

    _id?: any
    spreadsheetId: string,
    idSheet: number,
    nmSheet?: string,
    version?: number,
    colunas?: {
        idColuna: number,
        nmColuna: string 
    }[],
    respostas?: {
        idResposta: string,
        carimbo: string,
        campos: {
            idColuna: number,
            deCampo: string
        }[]
    }[],
    comentarios?: {
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