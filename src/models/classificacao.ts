export interface IClassificacao {

    _id?: any
    spreadsheetId: string,
    idSheet: number,
    titulo?: string,
    version?: number,
    status?: string;
    dataCriacao?: Date,
    dataAtualizacao?: Date,
    categorias?: [],
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