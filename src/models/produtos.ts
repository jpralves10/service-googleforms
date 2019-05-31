export interface IAtributo {
    atributo: string;
    valor: string;
}

export interface ICodigoInterno {
    valor: string;
}

export interface ICompatibilidade {
    similaridade: number;
    identicos: number;

    verde: number;
    amarelo: number;
    vermelho: number;
    cinza: number;
}

export interface IDeclaracao {
    numeroDI: string;
    dataRegistro: Date;
    importadorNome: string;
    importadorNumero: string;
    numeroAdicao: string;
    canal: string;
}

export interface IProduto {

    /** Controle Interno **/
    _id: string;
    status: string;
    descricaoBruta: string;
    etapaConformidade?: number;

    /** Informações Declaracao **/
    numeroDI: string;
    dataRegistro: Date;
    importadorNome: string;
    importadorNumero: string;
    numeroAdicao: string;
    canal: string;

    // lista caso estejam unidos
    declaracoes?: IDeclaracao[];

    /** Versões Produto **/
    versoesProduto: IProduto[];
    compatibilidade: ICompatibilidade;

    /** Histórico **/
    dataCriacao: Date;
    dataAtualizacao: Date;
    usuarioAtualizacao: string;

    /** Integração API **/
    seq: string;
    codigo: number;
    descricao: string;
    cnpjRaiz: string;
    situacao: string;
    modalidade: string;
    ncm: string;
    codigoNaladi: number;
    codigoGPC: number;
    codigoGPCBrick: number;
    codigoUNSPSC: number;
    paisOrigem: string;
    fabricanteConhecido: boolean;
    cpfCnpjFabricante: string;
    codigoOperadorEstrangeiro: string;
    atributos: Array<IAtributo>;
    codigosInterno: Array<string>;
}