import { Request, Response } from 'express';
import * as db from './notificacoes.database'

import * as NotificacaoController from './notificacoes.database';
import { INotificacoes } from 'src/models/notificacoes';

export const setNotificacao = async (req: Request, res: Response) => {

    setNotificacaoForm(req, res)
    res.send('200')
}

export const setNotificacaoForm = async (req: Request, res: Response) => {

    let notificacao = {} as INotificacoes;

    let opcional:any = req.body.opcional
    
    notificacao.idEmail = opcional.idEmail
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

export const getFindAllNotificacoes = async (req: Request, res: Response) => {

    db.notificacoesFindAll().then((notificacoes) => {
        notificacoes.length > 0 ? res.send(notificacoes) : res.send([]);
    }).catch(function(e) {
        console.log(e);
    })
}

export const delNotificacoesForm = async (req: Request, res: Response) => {
    let notificacoes = req.body;

    if(notificacoes._id != undefined){
        db.notificacoesFormFindByCodigoRemove(notificacoes).then(() => {
            res.send('200')
        })
    }
}