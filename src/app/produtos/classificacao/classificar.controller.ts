import { Request, Response } from 'express';
import * as db from './classificar.database'
import { IProduto } from 'src/models/produtos';
import { IClassificar } from 'src/models/classificar';

export const setProduto = async (req: Request, res: Response) => {

    let classificar = {} as IClassificar;
    
    classificar.titulo = 'Produto a ser classificado'
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
                    console.log('AA1> ', ret)
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

    /*db.classificacaoFindAll().then((classificacoes) => {
        classificacoes.length > 0 ? res.send(classificacoes) : res.send([]);
    }).catch(function(e) {
        console.log(e);
    })*/
}