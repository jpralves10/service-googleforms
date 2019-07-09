import { Request, Response } from 'express';
import * as db from './notificacoes.database'

import * as NotificacaoController from './notificacoes.database';
import { INotificacoes } from 'src/models/notificacoes';

export const setNotificacao = async (req: Request, res: Response) => {

    setNotificacaoForm(req, res, req.body.opcional)
    res.send('200')
}

export const setNotificacaoForm = async (req: Request, res: Response, opcional?:{titulo: string, tela: string, produto: string, descricaoProduto: string} ) => {

    let notificacao = {} as INotificacoes;
    
    notificacao.titulo = opcional.titulo
    notificacao.tela = opcional.tela
    notificacao.produto = opcional.produto
    notificacao.descricaoProduto = opcional.descricaoProduto
    notificacao.version = 0
    notificacao.status = 'Pendente'
    notificacao.dataCriacao = new Date
    notificacao.dataAtualizacao = new Date

    db.notificacoesSave(notificacao).then(ret => {})
}