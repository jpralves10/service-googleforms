import { Request, Response } from 'express';
import { IClassificacao } from '../../../models/classificacao';
import * as db from './classificacao.database'

import dadosMock from './classificacao.mock';
import * as sheet from './classificacao.sheet';
import { ICategoriasForm } from 'src/models/categoriasForm';

const spreadsheetId = '1PZCLAymlsaBO1GLFPGxjZSONkYGwy-tYBeXyIDibjaQ';

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

    //let parametros: {spreadsheetId: string, idSheet: number, nmSheet: string} = res.body

    let parametros = {
        spreadsheetId: spreadsheetId,
        idSheet: 1997890537,
        nmSheet: 'FORMULÁRIO NCM - HCX CONSULTORIA'
    };

    var sheets = await sheet.getSpreedsheet(parametros.spreadsheetId, 'A1:ZZZ100000'); //dadosMock;
    var colunas: any = [];
    var respostas: any = [];

    sheets.forEach((sheet, i) => {
        i == 0 ?
        sheet.forEach(item => { colunas.push(item) }) :
        respostas.push(sheet);
    })

    db.classificacaoFindByIdSheet(parametros.idSheet).then((classificacoes) => {
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
        classificacao.nmSheet = parametros.nmSheet;
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

    res.sendStatus(200)
}

export const getClassificacao = async (req: Request, res: Response) => {

    let classificacao: IClassificacao = req.body;

    db.classificacaoFindBySpreadsheetId(
        classificacao.spreadsheetId
    ).then((classificacoes) => {
            
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

    db.classificacaoFindBySpreadsheetId(parametros.spreadsheetId).then((classificacoes) => {
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
        idSheet: 1997890537,
        idResposta: 'jean@eficilog.com'
    };

    let comentarios = [];

    db.classificacaoFindBySpreadsheetId(parametros.spreadsheetId).then((classificacoes) => {
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

    if(comentarios.length > 0){

        let comentario = comentarios[0];

        db.classificacaoFindByIdSheetAndVersion(
            comentario.idSheet, 
            comentario.sheetVersao
        ).then((classificacoes) => {
            let classificacao = classificacoes[0];
            let flcomentario = false;

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
                comentario.idComentario = getIdComentario(classificacao);
                classificacao.comentarios.push(comentario);
                db.classificacaoUpdate(classificacao);
            }

            //googleNotes(classificacao)
            res.send([classificacao]);

        }).catch(function(e) {
            console.log(e);
        })
    }else{
        res.send([])
    }

    const getIdComentario = (classificacao:IClassificacao) => {
        if(classificacao.comentarios.length > 0){
            let comentarios = [...classificacao.comentarios];
            setSortComentarios(comentarios)
            return (comentarios.pop().idComentario + 1);
        }else{
            return 0;
        }
    }

    const setSortComentarios = (comentarios:any) => {
        comentarios.sort((a, b) => a.idComentario > b.idComentario ? 1 : -1 );
    };

    const googleNotes = async (classificacao:IClassificacao) => {

        classificacao.comentarios.forEach(comentario => {
            comentario
        })

        classificacao.respostas.forEach(resposta => {
            (resposta.idResposta)
        })

        let parametro: {
            sheetId:number, 
            startRowIndex:number, 
            endRowIndex:number,
            startColumnIndex:number,
            endColumnIndex:number,
            note:string
        }

        sheet.setSpreedsheetNotes(parametro)
        res.sendStatus(200)
    }
}

export const getCategoriasForm = async (req: Request, res: Response) => {

    let categoria = req.body

    if(categoria.codigo != undefined){
        db.categoriasFormularioFindByCodigo(categoria.codigo).then((categorias) => {
            res.send(categorias)
        })
    }else{
        db.categoriasFormularioFindAll().then((categorias) => {
            res.send(categorias)
        })
    }
}

export const setCategoriasForm = async (req: Request, res: Response) => {

    let categoria = req.body;

    db.categoriasFormularioFindAll().then((categorias) => {

        let flCategoria = false;

        if(categorias.length > 0){
            categorias.forEach(dbcategoria => {
                if(categoria.codigo == dbcategoria.codigo){
                    dbcategoria.descricao = categoria.descricao
                    db.categoriasFormUpdate(dbcategoria);
                    flCategoria = true
                }
            })

            if(!flCategoria){
                categoria.codigo = getCodigoCategoria(categorias);
                db.categoriasFormSave(categoria);
            }
        }else{
            categoria.codigo = getCodigoCategoria(categorias);
            db.categoriasFormSave(categoria);
        }

        db.categoriasFormularioFindAll().then((categorias) => {
            res.send(categorias)
        })
    })

    const getCodigoCategoria = (categorias:ICategoriasForm[]) => {
        if(categorias.length > 0){
            let newCategorias = [...categorias];
            setSortCategorias(newCategorias)
            return (categorias.pop().codigo + 1);
        }else{
            return 0;
        }
    }

    const setSortCategorias = (categorias:any) => {
        categorias.sort((a, b) => a.codigo > b.codigo ? 1 : -1 );
    }
}