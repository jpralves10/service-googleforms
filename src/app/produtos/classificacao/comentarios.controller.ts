import { Request, Response } from 'express';
import { IClassificacao } from '../../../models/classificacao';
import * as db from './classificacao.database'
import * as sheet from './classificacao.sheet';

const spreadsheetId = '1PZCLAymlsaBO1GLFPGxjZSONkYGwy-tYBeXyIDibjaQ';

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