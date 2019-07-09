import { Request, Response } from 'express';
import * as db from './suporte.database'

import * as SuporteController from './suporte.database';
import { ISuporte } from 'src/models/suporte';

export const setSuporte = async (req: Request, res: Response) => {

    setSuporteForm(req, res, req.body.opcional)
    res.send('200')
}

export const setSuporteForm = async (req: Request, res: Response, opcional?:{titulo: string, tela: string, produto: string} ) => {

    let suporte = {} as ISuporte;
    
    suporte.titulo = opcional.titulo
    suporte.version = 0
    suporte.status = 'Pendente'
    suporte.dataCriacao = new Date
    suporte.dataAtualizacao = new Date

    /*_id?: any
    codigo:number,
    titulo?: string,
    descricao?: string,
    email: string,
    nome: string,
    version?: number,
    status?: string;
    dataCriacao?: Date,
    dataAtualizacao?: Date*/

    db.suporteSave(suporte).then(ret => {})
}