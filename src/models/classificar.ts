import { IProduto } from "./produtos";

export interface IClassificar {

    _id?: any
    codigo:number,
    titulo?: string,
    version?: number,
    status?: string;
    dataCriacao?: Date,
    dataAtualizacao?: Date,
    produto?: IProduto
}