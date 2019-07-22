import { Request, Response } from 'express';
import * as db from './classificar.database'
import * as db_classificacao from './classificacao.database'
import { IProduto } from 'src/models/produtos';
import { IClassificar } from 'src/models/classificar';
import * as sheet from './classificacao.sheet';

import * as NotificacoesController from '../shared/notificacoes.controller';
import { IClassificacao } from 'src/models/classificacao';

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

                //'A1:ZZZ10000'

                /*let N = classificar.classificacao.respostas.length + 2;

                sheet.setSpreedsheetEmail(
                    classificar.classificacao.spreadsheetId,
                    'B'+N+':'+'B'+N,
                    [classificar.usuario.email]
                ).then(item => {*/

                    db.classificarSave(classificar).then(ret => {

                        req.body.opcional = {
                            titulo: 'Classificar Produto', 
                            tela: '/classificacao-preencher', 
                            produto: classificar.produto._id as string ,
                            descricaoProduto: classificar.produto.descricaoBruta
                        }

                        NotificacoesController.setNotificacaoForm(req, res)
                    })
                //})
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

export const setClassificarUpdate = async (req: Request, res: Response) => {

    let classificar = {} as IClassificar;
    classificar = req.body

    db.classificarFindByCodigoRemove(classificar).then(ret => {
        db.classificarSave(classificar).then(ret2 => {})
    })
    
    res.send('200')
}

export const setClassificarSpreed = async (req: Request, res: Response) => {

    let classificar = {} as IClassificar;
    classificar = req.body

    var colunas: any = [];
    var respostas: any = [];

    //console.log('AAA1>> ', classificar.classificacao)

    await sheet.getSpreedsheet(classificar.classificacao.spreadsheetId, 'A1:ZZZ10000').then(item => {

        item.forEach((sheet, i) => {
            i == 0 ?
            sheet.forEach(item => { colunas.push(item) }) :
            respostas.push(sheet);
        })

        //console.log('AAA>> ', item)

        //if(getVerificarVersao(classificar.classificacao)){


            classificar.classificacao.respostas = []

            respostas.forEach(resposta => {

                let campos:{ idColuna: number, deCampo: string }[] = [];
                let campo: { idColuna: number, deCampo: string };
                let idResposta: string = '';
                let idProduto: string = '';
                let carimbo: string = '';

                resposta.forEach((item, i) => {
                    if(i == 0){
                        carimbo = item as string;
                    }else if(i == 1){
                        idResposta = item as string;
                    }else if(i == 2){
                        idProduto = item as string;
                    }else if(i > 2){
                        campo = {
                            'idColuna': classificar.classificacao.colunas[i].idColuna as number,
                            'deCampo': item as string
                        }
                        campos.push(campo);
                    }
                })
                classificar.classificacao.respostas.push({
                    'idResposta': idResposta,
                    'idProduto': idProduto,
                    'carimbo': carimbo,
                    'campos': campos
                })
            })
            
            //console.log('AAA3>> ', classificar)

            //db.classificarUpdate(classificar);

            db.classificarFindByCodigoRemove(classificar).then(ret => {
                db.classificarSave(classificar).then(ret2 => {

                    db_classificacao.classificacaoFindByCodigoRemove(classificar.classificacao).then(ret => {
                        db_classificacao.classificacaoSave(classificar.classificacao).then(ret2 => {})
                    })
                })
            })
            
            res.send('200')

        /*}else{
            res.send('Error: Versão do formulário incompatível!')
        }*/

    }).catch(err => {
        var msgError = 'Error: The caller does not have permission!';
        const error = new RegExp(msgError)

        if(error.exec(err) != null){
            res.send(msgError)
        }else{
            res.send('Error')
        }
    });
}