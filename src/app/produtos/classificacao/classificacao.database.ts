//import { ObjectId } from 'bson';
import {
    classificacaoCollection
} from '../../../database/mongodb';

import { IClassificacao } from '../../../models/classificacao';
 
// Classificacao

export const classificacaoFindBySpreadsheetId = async (spreadsheetId:string) => {
    const col = await classificacaoCollection;
    return await col.find({spreadsheetId: spreadsheetId}).toArray() as IClassificacao[];
}

export const classificacaoFindByIdSheet = async (idSheet:number) => {
    const col = await classificacaoCollection;
    return await col.find({idSheet: idSheet}).toArray() as IClassificacao[];
}

export const classificacaoFindByIdSheetAndVersion = async (idSheet:string, version:number) => {
    const col = await classificacaoCollection;
    return await col.find({idSheet: idSheet, version:version}).toArray() as IClassificacao[];
}

export const classificacaoSave = async (classificacao:IClassificacao) => {
    const col = await classificacaoCollection;
    await col.insertOne(classificacao).then(() => {
        return true;
    }).catch(function(e) {
        console.log(e);
        return false
    });
}

export const classificacaoUpdate = async (classificacao:IClassificacao) => {
    const col = await classificacaoCollection;

    var query = {idSheet: classificacao.idSheet};
    var newClassificacao = {$set: classificacao};

    await col.updateOne(query, newClassificacao).then(() => {
        return true;
    }).catch(function(e) {
        console.log(e);
        return false
    });
}