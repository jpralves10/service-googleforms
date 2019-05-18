import { Request, Response } from 'express';
import { Classificacao } from '../../../models/classificacao';
import { Comentario } from '../../../models/comentario';
import {
    comentario_find,
    comentario_save
} from './classificacao.database'

import dadosMock from './classificacao.mock';

var request = require('request');

export const sheets = async (req: Request, res: Response) => {

    /*
    {
        _id: any
        idSheet: string,
        nmSheet: string,
        colunas: [{
            idColuna: string,
            nmColuna: string 
        }],
        respostas: [{
            idResposta: string,
            carimbo: string,
            campos: [{
                idColuna: string,
                idCampo: string,
                deCampo: string
            }]
        }]
        comentarios: [{
            idComentario: string,
            idResposta: string,
            idColuna: string,
            idCampo: string,
            status: string;
            descricao: string;
        }]
    }
    */


    var campos = [{}];

    //var sheets = req.body;
    var sheets = dadosMock;

    //console.log("Sheets: ", sheets);

    var classificacao: Classificacao = null;

    var count = 0;

    sheets.forEach(sheetLists => {
        if(count == 0){

            let contItem = 0;
            sheetLists.forEach(item => {
                if(contItem == 0){
                    classificacao.idSheet = item as number;
                }else{
                    classificacao.nmSheet = item as string;
                }
                contItem++;
            });

        }else if(count == 1){

            for(var i = 0; i < sheetLists.length; i++){
                classificacao.colunas.push({'idColuna': i, 'nmColuna': sheetLists[i] as string})
            };

        }
        count++;
    })

    //console.log("Classificacao: ", classificacao);

    /*var classificacao: Classificacao = {

        idSheet: sheets.sheet.idSheet,
        nmSheet: sheets.sheet.nmSheet,
    }*/


    //console.log(classificacao); //body

    res.sendStatus(200)
}

export const classificacaoSave = async (req: Request, res: Response) => {

    let comentario: Comentario = {
        codigoFormulario: '123',
        codigoCampo: '001',
        carimboDataHora: '2019-04-18T19:03:54.000Z',
        emailUser: 'jean@eficilog.com',
        status: 'Pendente',
        descricao: 'Descrição da Mercadoria teste'
    }

    comentario_save(comentario);

    console.log(req.body); //body

    res.sendStatus(200)
}

export const comentarioFind = async (req: Request, res: Response) => {

    let foundComentario;
    
    comentario_find().then((comentarios) => {
        comentarios.forEach(comentario => {
            console.log(comentario)
        })
    }).catch(function(e) {
        console.log(e);
    })

    res.sendStatus(200)
}

export const comentarioSave = async (req: Request, res: Response) => {

    let comentario: Comentario = {
        codigoFormulario: '123',
        codigoCampo: '001',
        carimboDataHora: '2019-04-18T19:03:54.000Z',
        emailUser: 'jean@eficilog.com',
        status: 'Pendente',
        descricao: 'Descrição da Mercadoria teste'
    }

    comentario_save(comentario);

    console.log(req.body); //body

    res.sendStatus(200)
}