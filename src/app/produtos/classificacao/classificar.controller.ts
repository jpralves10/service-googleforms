import { Request, Response } from 'express';
import * as db from './classificar.database'
import { IProduto } from 'src/models/produtos';
import { IClassificar } from 'src/models/classificar';

import * as NotificacoesController from '../shared/notificacoes.controller';

export const classificarSave = async (req: Request, res: Response) => {

    let classificar = {} as IClassificar;

    classificar.titulo = req.body[1].descricaoBruta
    classificar.version = 0
    classificar.status = 'Classificar'
    classificar.dataCriacao = new Date
    classificar.dataAtualizacao = new Date
    classificar.usuario = req.body[0]
    classificar.produto = req.body[1]

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

                classificar.classificacao = undefined

                db.classificarSave(classificar).then(ret => {

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

    let classificar = req.body

    db.classificarFindByCodigoRemove(classificar).then(ret => {
        db.classificarSave(classificar).then(listdb => {
            res.send('200')
        })
    }).catch(error => {})
}

export const getFindClassificar = async (req: Request, res: Response) => {

    /*let classificar = req.body

    db.classificarFindByCodigo(classificar.codigo).then((classificar) => {
        res.send(classificar)
    }).catch(function(e) { console.log(e);})*/
}

export const getFindAllClassificar = async (req: Request, res: Response) => {

    db.classificarFindAll().then((classificacoes) => {
        classificacoes.length > 0 ? res.send(classificacoes) : res.send([]);
    }).catch(function(e) {
        console.log(e);
    })
}