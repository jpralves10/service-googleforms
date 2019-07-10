import { Request, Response } from 'express';
import * as db from './classificar.database'
import { IProduto } from 'src/models/produtos';
import { IClassificar } from 'src/models/classificar';

import * as PreencherController from './preencher.controller';
import * as NotificacoesController from '../shared/notificacoes.controller';

export const setProduto = async (req: Request, res: Response) => {

    let classificar = {} as IClassificar;
    
    classificar.titulo = req.body.descricaoBruta
    classificar.version = 0
    classificar.status = 'Classificar'
    classificar.dataCriacao = new Date
    classificar.dataAtualizacao = new Date
    classificar.produto = req.body

    db.classificarFindAll().then(listdb => {

        let check = false;

        listdb.forEach(classificardb => {
            if(classificardb.produto._id == classificar.produto._id){
                check = true;
            }
        })

        if(!check){
            db.classificarFindMaxCodigo().then(list => {

                if(list[0] == undefined){
                    classificar.codigo = 0
                }else{
                    classificar.codigo = (list[0].max + 1)
                }

                db.classificarSave(classificar).then(ret => {
                    PreencherController.setPreencherForm(req, res);

                    req.body.opcional = {
                        titulo: 'Classificar Produto', 
                        tela: '/classificacao-preencher', 
                        produto: classificar.produto._id as string ,
                        descricaoProduto: classificar.produto.descricaoBruta
                    }

                    NotificacoesController.setNotificacaoForm(req, res)
                })
            })
        }
    });

    res.send('200')
}

export const setClassificar = async (req: Request, res: Response) => {

}

export const getFindClassificar = async (req: Request, res: Response) => {

    /*let classificacao: IProduto = req.body;

    db.classificacaoFindBySpreadsheetId(
        classificacao.spreadsheetId
    ).then((classificacoes) => {
        classificacoes.length > 0 ? res.send(classificacoes) : res.send([])
    }).catch(function(e) {
        console.log(e);
    })*/
}

export const getFindAllClassificar = async (req: Request, res: Response) => {

    db.classificarFindAll().then((classificacoes) => {
        classificacoes.length > 0 ? res.send(classificacoes) : res.send([]);
    }).catch(function(e) {
        console.log(e);
    })
}