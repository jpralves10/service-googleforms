import { Request, Response } from 'express';
import * as db from './preencher.database'
import { IPreencher } from 'src/models/preencher';

export const setProduto = async (req: Request, res: Response) => {

    setPreencherForm(req, res);
    res.send('200')
}

export const setPreencherForm = async (req: Request, res: Response) => {

    let preencher = {} as IPreencher;
    
    preencher.titulo = req.body.descricaoBruta
    preencher.version = 0
    preencher.status = 'Classificar'
    preencher.dataCriacao = new Date
    preencher.dataAtualizacao = new Date
    preencher.produto = req.body

    db.preencherFindAll().then(listdb => {

        let check = false;

        listdb.forEach(classificardb => {
            if(classificardb.produto._id == preencher.produto._id){
                check = true;
            }
        })

        if(!check){
            db.preencherFindMaxCodigo().then(list => {

                if(list[0] == undefined){
                    preencher.codigo = 0
                }else{
                    preencher.codigo = (list[0].max + 1)
                }
                
                db.preencherSave(preencher).then(ret => {
                    console.log('AA1> ', ret)
                })
            })
        }
    });
}