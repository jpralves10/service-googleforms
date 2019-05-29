import { Request, Response } from 'express';
import { Classificacao, IClassificacao } from '../../../models/classificacao';
import * as db from './classificacao.database'

import dadosMock from './classificacao.mock';
import * as sheet from './classificacao.sheet';

const spreadsheetId = '1PZCLAymlsaBO1GLFPGxjZSONkYGwy-tYBeXyIDibjaQ';

//var request = require('request');

// Classificacao

export const setClassificacaoEmail = async (req: Request, res: Response) => {

    let parametros: {idSheet: string, idResposta: string} = res.body

    db.classificacaoFindByIdSheet(parametros.idSheet).then((classificacoes) => {
        if(classificacoes.length > 0){
            classificacoes.forEach(classificacao => {

                let qtdRespostas = classificacao.respostas.length;
                let range = 'B' + qtdRespostas + ':' + 'B' + qtdRespostas;

                sheet.setSpreedsheetEmail(parametros.idSheet, range, [parametros.idResposta]) ?
                res.send('200') : res.send('400')
            })
        }
    })
}

export const setClassificacao = async (req: Request, res: Response) => {

    let parametros: {idSheet: string, nmSheet: string} = res.body

    var sheets = await sheet.getSpreedsheet(parametros.idSheet, 'A1:Q10000'); //dadosMock;
    var colunas: any = [];
    var respostas: any = [];

    sheets.forEach((sheet, i) => {
        i == 0 ?
        sheet.forEach(item => { colunas.push(item) }) :
        respostas.push(sheet);
    })

    db.classificacaoFindByIdSheet(spreadsheetId).then((classificacoes) => {
        if(classificacoes.length == 0){
            setNewClassificacao(0);
        }else{
            setSortClassificacoes(classificacoes);
            let classificacao = classificacoes[0];

            if(getVerificarVersao(classificacao)){
                classificacao.respostas = [];
                getRespostas(classificacao)
                db.classificacaoUpdate(classificacao);
            }else{
                setNewClassificacao(++classificacao.version);
            }
        }
    }).catch(function(e) {
        console.log(e);
    })

    const setSortClassificacoes = async (classificacoes:IClassificacao[]) => {
        classificacoes.sort((a, b) => a.version > b.version ? 1 : -1 );
    };

    const setNewClassificacao = async (version:number) => {
        let classificacao = new Classificacao();
        classificacao.version = version;

        getHeader(classificacao)
        getColunas(classificacao)
        getRespostas(classificacao)

        db.classificacaoSave(classificacao);
    };

    const getHeader = async (classificacao:IClassificacao) => {
        classificacao.idSheet = parametros.idSheet;
        classificacao.nmSheet = parametros.nmSheet;
    };

    const getColunas = async (classificacao:IClassificacao) => {
        colunas.forEach((item, i) => {
            classificacao.colunas.push({
                'idColuna': i,
                'nmColuna': item as string
            })
        })
    };

    const getRespostas = async (classificacao:IClassificacao) => {

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

    res.sendStatus(200)
}

export const getClassificacao = async (req: Request, res: Response) => {

    let classificacao: IClassificacao = req.body;

    db.classificacaoFindByIdSheet(classificacao.idSheet).then((classificacoes) => {
        if(classificacoes.length > 0){
            res.send(classificacoes)
        }else{
            res.send([])
        }
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

    db.classificacaoFindByIdSheet(parametros.idSheet).then((classificacoes) => {
        if(classificacoes.length > 0){
            classificacoes.forEach(classificacao => {
                if(classificacao.colunas.length > 0){
                    res.send(classificacao.colunas);
                }
                else{
                    res.send([]);
                }
            })
        }else{
            res.send([]);
        }
    })
}

// Comentario

export const getComentarios = async (req: Request, res: Response) => {

    let parametros = {
        spreadsheetId: '1PZCLAymlsaBO1GLFPGxjZSONkYGwy-tYBeXyIDibjaQ',
        idResposta: 'jean@eficilog.com'
    };

    let comentarios = [];

    db.classificacaoFindByIdSheet(parametros.spreadsheetId).then((classificacoes) => {
        if(classificacoes.length > 0){
            classificacoes.forEach(classificacao => {
                if(classificacao.comentarios.length > 0){
                    classificacao.comentarios.forEach(dbcomentario => {
                        if(dbcomentario.idResposta == parametros.idResposta){
                            comentarios.push(dbcomentario)
                        }
                    })
                    res.send(comentarios)
                }
                else{
                    res.send([])
                }
            })
        }
    })
}

export const setComentarios = async (req: Request, res: Response) => {

    /*let comentarios = [{
        idSheet: 1997890537,
        idComentario: null,
        idResposta: 'jean@eficilog.com',
        idColuna: 3,
        idUsuario: 'jean@eficilog.com',
        nmUsuario: 'Jean Alves',
        descricao: "Teste do caompo: 'Mercadoria completa'",
        status: 'Pendente',
        dataCriacao: new Date(),
        dataAtualizacao: new Date()
    }]*/

    let comentarios = req.body;

    comentarios.forEach(comentario => {
        db.classificacaoFindByIdSheetAndVersion(comentario.idSheet, comentario.sheetVersao).then((classificacoes) => {

            let classificacao = classificacoes[0];
            comentario.side = undefined;

            if(classificacao.comentarios.length > 0){
                let flcomentario = false;

                let idComentarioMax = Math.max.apply(Math, classificacao.comentarios.map((maxCom) => { 
                    return maxCom.idComentario; 
                }))

                classificacao.comentarios.forEach(dbcomentario => {
                    if(dbcomentario.idComentario == comentario.idComentario &&
                        dbcomentario.idResposta == comentario.idResposta &&
                        dbcomentario.idColuna == comentario.idColuna){

                        dbcomentario.descricao = comentario.descricao;
                        dbcomentario.status = comentario.status;
                        dbcomentario.dataAtualizacao = new Date();
                        flcomentario = true;
                    }
                })

                if(flcomentario){
                    db.classificacaoUpdate(classificacao);
                }else{
                    comentario.idComentario = ++idComentarioMax;
                    classificacao.comentarios.push(comentario);
                    db.classificacaoUpdate(classificacao);
                }
            }else{
                comentario.idComentario = 0;
                classificacao.comentarios.push(comentario);
                db.classificacaoUpdate(classificacao);
            }
            
            res.send([classificacao]);

        }).catch(function(e) {
            console.log(e);
        })
    })
}