import { Request, Response } from 'express';
import { IClassificacao } from '../../../models/classificacao';
import * as db from './classificacao.database'

import dadosMock from './classificacao.mock';
import * as sheet from './classificacao.sheet';
import { IClassificar } from 'src/models/classificar';

//var request = require('request');

// Classificacao

export const setClassificacaoEmail = async (req: Request, res: Response) => {

    let parametros: {spreadsheetId: string, idResposta: string} = res.body

    db.classificacaoFindBySpreadsheetId(parametros.spreadsheetId).then((classificacoes) => {
        if(classificacoes.length > 0){
            classificacoes.forEach(classificacao => {

                let qtdRespostas = classificacao.respostas.length;
                let range = 'B' + qtdRespostas + ':' + 'B' + qtdRespostas;

                sheet.setSpreedsheetEmail(parametros.spreadsheetId, range, [parametros.idResposta]) ?
                res.send('200') : res.send('400')
            })
        }
    })
}

export const setClassificacao = async (req: Request, res: Response) => {

    var parametros = req.body[0]
    var colunas: any = [];
    var respostas: any = [];

    //console.log('parametros ', parametros)

    await sheet.getSpreedsheet(parametros.spreadsheetId, 'A1:ZZZ10000').then(item => {

        item.forEach((sheet, i) => {
            i == 0 ?
            sheet.forEach(item => { colunas.push(item) }) :
            respostas.push(sheet);
        })

        db.classificacaoFindByIdSheet(parametros.spreadsheetId, parametros.idSheet).then((classificacoes) => {
            if(classificacoes.length == 0){
                setNewClassificacao(0);
            }else{
                setSortClassificacoes(classificacoes);
                let classificacao = classificacoes[0];

                if(getVerificarVersao(classificacao)){
    
                    classificacao.respostas = [];
    
                    getHeader(classificacao)
                    getRespostas(classificacao)
    
                    db.classificacaoUpdate(classificacao);
                }else{
                    setNewClassificacao(++classificacao.version);
                }
            }

            res.send('200')

        }).catch(function(e) {
            console.log(e);
        })

    }).catch(err => {
        var msgError = 'Error: The caller does not have permission';
        const error = new RegExp(msgError)

        if(error.exec(err) != null){
            res.send(msgError)
        }
    });
    
    // Functions Utils

    const setSortClassificacoes = (classificacoes:IClassificacao[]) => {
        classificacoes.sort((a, b) => a.version > b.version ? 1 : -1 );
    };

    const setNewClassificacao = async (version:number) => {
        let classificacao = {} as IClassificacao;
        classificacao.version = version;

        getHeader(classificacao)
        getColunas(classificacao)
        getRespostas(classificacao)

        classificacao.comentarios = []

        db.classificacaoSave(classificacao);
    };

    const getHeader = async (classificacao:IClassificacao) => {
        classificacao.spreadsheetId = parametros.spreadsheetId;
        classificacao.idSheet = parametros.idSheet;
        classificacao.iframe = parametros.iframe;
        classificacao.titulo = parametros.titulo;
        classificacao.status = parametros.status;
        classificacao.dataCriacao = parametros.dataCriacao;
        classificacao.dataAtualizacao = parametros.dataAtualizacao;
        classificacao.categorias = parametros.categorias;
    };

    const getColunas = async (classificacao:IClassificacao) => {
        
        classificacao.colunas = []

        colunas.forEach((item, i) => {
            classificacao.colunas.push({
                'idColuna': i,
                'nmColuna': item as string
            })
        })
    };

    const getRespostas = async (classificacao:IClassificacao) => {

        classificacao.respostas = []

        respostas.forEach(resposta => {

            let campos:{ idColuna: number, deCampo: string }[] = [];
            let campo: { idColuna: number, deCampo: string };
            let idResposta: string = '';
            let carimbo: string = '';

            resposta.forEach((item, i) => {
                if(i == 0){
                    carimbo = item as string;
                }else if(i == 1){
                    idResposta = item as string;
                }else if(i > 1){
                    campo = {
                        'idColuna': classificacao.colunas[i].idColuna as number,
                        'deCampo': item as string
                    }
                    campos.push(campo);
                }
            })
            classificacao.respostas.push({
                'idResposta': idResposta,
                'carimbo': carimbo,
                'campos': campos
            })
        })
    };

    const getVerificarVersao = async (classificacao:IClassificacao) => {
        
        if(classificacao.colunas.length != colunas.length){
            return false;
        }

        classificacao.colunas.forEach(dbcoluna => {
            let flColuna = false;
            colunas.forEach(coluna => {
                if(coluna == dbcoluna.nmColuna){
                    flColuna = true;
                }
            })
            if(!flColuna){
                return false;
            }
        })
        return true;
    };
}

export const getFindClassificacao = async (req: Request, res: Response) => {

    let classificacao: IClassificacao = req.body;

    db.classificacaoFindBySpreadsheetId(
        classificacao.spreadsheetId
    ).then((classificacoes) => {
        classificacoes.length > 0 ? res.send(classificacoes) : res.send([])
    }).catch(function(e) {
        console.log(e);
    })
}

export const getFindAllClassificacao = async (req: Request, res: Response) => {

    db.classificacaoFindAll().then((classificacoes) => {
        classificacoes.length > 0 ? res.send(classificacoes) : res.send([]);
    }).catch(function(e) {
        console.log(e);
    })
}

// Colunas

export const getColunas = async (req: Request, res: Response) => {

    /*let parametros = {
        idSheet: 1997890537
    };*/

    let parametros = req.body
    console.log(parametros)

    db.classificacaoFindBySpreadsheetId(parametros.spreadsheetId).then((classificacoes) => {
        if(classificacoes.length > 0){
            classificacoes.forEach(classificacao => {
                classificacao.colunas.length > 0 ? res.send(classificacao.colunas) : res.send([]);
            })
        }else{
            res.send([]);
        }
    })
}