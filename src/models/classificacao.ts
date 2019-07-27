export interface IClassificacao {

    _id?: any
    spreadsheetId: string,
    idSheet: number,
    iframe: string,
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
        idProduto: string
        carimbo: string,
        campos: {
            idColuna: number,
            deCampo: string
        }[]
    }[],
    comentarios?: {
        idSheet: number,
        idClassificar: number,
        idComentario: number,
        idResposta: string,
        idProduto: string,
        idColuna: number,
        idUsuario: string,
        nmUsuario: string,
        status: string,
        descricao: string,
        dataCriacao: Date,
        dataAtualizacao: Date
    }[]
}