import { Request, Response } from 'express';
import { Classificacao, IClassificacao } from '../../../models/classificacao';
import * as db from './classificacao.database'

import dadosMock from './classificacao.mock';

//var request = require('request');

// Classificacao

export const setClassificacao = async (req: Request, res: Response) => {

    var classificacao: Classificacao = new Classificacao();
    var sheets = dadosMock; //req.body
    var count = 0;

    if(sheets.length > 0){
        db.classificacaoFindByIdSheet(sheets[0][0] as number).then((dbclassificacoes) => {
            if(dbclassificacoes.length > 0){
                dbclassificacoes.forEach(dbclassificacao => {
    
                    sheets.forEach(sheetLists => {
    
                        if(count == 0){ //Classificacao
                            sheetLists.forEach((item, index) => {
                                if(index == 1){
                                    dbclassificacao.nmSheet = item as string;
                                }
                            });
                        }else if(count == 1){ //Colunas 

                            sheetLists.forEach((item, index) => { //Novas
                                let flColuna = false;
                                dbclassificacao.colunas.forEach(dbcoluna => {
                                    if(item == dbcoluna.nmColuna){
                                        flColuna = true;
                                    }
                                })
                                if(!flColuna){
                                    let idColunaMax = Math.max.apply(Math, dbclassificacao.colunas.map((maxCol) => { 
                                        return maxCol.idColuna; 
                                    }))
                                    dbclassificacao.colunas.push({
                                        'idColuna': ++idColunaMax,
                                        'sequencia': index,
                                        'nmColuna': item as string
                                    })
                                }
                            })

                            dbclassificacao.colunas.forEach(dbcoluna => { //Existentes
                                let flColuna = false;
                                let sequencia = -1;
                                sheetLists.forEach((item, index) => {
                                    if(item == dbcoluna.nmColuna){
                                        flColuna = true;
                                        sequencia = index;
                                    }
                                })
                                if(flColuna){
                                    dbcoluna.sequencia = sequencia;
                                }
                            })
                        }else{ //Respostas
                            let campos:{ idColuna: number, deCampo: string }[] = [];
                            let campo: { idColuna: number, deCampo: string };
                            let idResposta: string = '';
                            let carimbo: string = '';
                
                            for(var i = 0; i < sheetLists.length; i++){
                                if(i == 0){
                                    carimbo = sheetLists[i] as string;
                                }else if(i == 1){
                                    idResposta = sheetLists[i] as string;
                                }else if(i > 1){
                                    campo = {
                                        'idColuna': classificacao.colunas[i].idColuna as number,
                                        'deCampo': sheetLists[i] as string
                                    }
                                    campos.push(campo);
                                }
                            };
                            classificacao.respostas.push({
                                'idResposta': idResposta, 
                                'carimbo': carimbo,
                                'campos': campos
                            })
                        }
                        count++;
                    })
    
                })
    
                
    
    
                
                db.classificacaoUpdate(classificacao);
            }
        }).catch(function(e) {
            console.log(e);
        })
    }

    

    sheets.forEach(sheetLists => {

        if(count == 0){ //Classificacao
            let contItem = 0;
            sheetLists.forEach(item => {
                if(contItem == 0){
                    classificacao.idSheet = item as number;
                }else{
                    classificacao.nmSheet = item as string;
                }
                contItem++;
            });
        }else if(count == 1){ //Colunas
            for(var i = 0; i < sheetLists.length; i++){
                classificacao.colunas.push({
                    'idColuna': i,
                    'sequencia': i, 
                    'nmColuna': sheetLists[i] as string
                })
            };
        }else{ //Respostas
            let campos:{ idColuna: number, deCampo: string }[] = [];
            let campo: { idColuna: number, deCampo: string };
            let idResposta: string = '';
            let carimbo: string = '';

            for(var i = 0; i < sheetLists.length; i++){
                if(i == 0){
                    carimbo = sheetLists[i] as string;
                }else if(i == 1){
                    idResposta = sheetLists[i] as string;
                }else if(i > 1){
                    campo = {
                        'idColuna': classificacao.colunas[i].idColuna as number,
                        'deCampo': sheetLists[i] as string
                    }
                    campos.push(campo);
                }
            };
            classificacao.respostas.push({
                'idResposta': idResposta, 
                'carimbo': carimbo,
                'campos': campos
            })
        }
        count++;
    })

    db.classificacaoFindByIdSheet(classificacao.idSheet).then((classificacoes) => {
        if(classificacoes.length <= 0){
            db.classificacaoSave(classificacao);
        }else{
            classificacoes[0].colunas.forEach(dbcoluna => {
                classificacao.colunas.forEach(coluna => {
                    if(coluna.nmColuna == dbcoluna.nmColuna){
                        coluna.idColuna = dbcoluna.idColuna;
                    }
                })
            })
            db.classificacaoUpdate(classificacao);
        }
    }).catch(function(e) {
        console.log(e);
    })

    //console.log("Classificacao: ", classificacao);

    res.sendStatus(200)
}

export const getClassificacao = async (req: Request, res: Response) => {

    let classificacao: IClassificacao = req.body;

    db.classificacaoFindByIdSheet(classificacao.idSheet).then((classificacoes) => {
        if(classificacoes.length == 1){
            res.send(classificacoes[0])
        }else{
            res.send({} as IClassificacao)
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
        idSheet: 1997890537,
        idResposta: 'jean@eficilog.com'
    };

    let comentarios = [];

    db.classificacaoFindByIdSheet(parametros.idSheet).then((classificacoes) => {
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

export const setComentario = async (req: Request, res: Response) => {

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

    let comentario = req.body;

    db.classificacaoFindByIdSheet(comentario.idSheet).then((classificacoes) => {
        if(classificacoes.length == 1){
            classificacoes.forEach(classificacao => {
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
            })
            res.send(classificacoes[0]);
        }
    }).catch(function(e) {
        console.log(e);
    })
}