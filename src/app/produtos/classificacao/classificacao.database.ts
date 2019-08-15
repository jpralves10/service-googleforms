import { ObjectId } from 'bson';
import { classificacaoCollection } from '../../../database/mongodb';
import { IClassificacao } from '../../../models/classificacao';

// Classificacao

export const classificacaoSave = async (classificacao:IClassificacao) => {
    const col = await classificacaoCollection;
    await col.insertOne(classificacao).catch(function(e) {
        console.log(e);
    });
}

export const classificacaoUpdate = async (classificacao:IClassificacao) => {
    const col = await classificacaoCollection;

    var query = {idSheet: classificacao.idSheet};
    var newClassificacao = {$set: classificacao};

    await col.updateOne(query, newClassificacao).catch(function(e) {
        console.log(e);
    });
}

export const classificacaoFindByCodigoRemove = async (classificacao:IClassificacao) => {
    const col = await classificacaoCollection;

    var query = {spreadsheetId: classificacao.spreadsheetId};
    return await col.deleteOne(query).catch(function(e) {
        console.log(e);
    });
}

export const classificacaoFindAll = async () => {
    const col = await classificacaoCollection;
    return await col.find({}).toArray() as IClassificacao[];
}

export const classificacaoFindBySpreadsheetId = async (spreadsheetId:string) => {
    const col = await classificacaoCollection;
    return await col.find({spreadsheetId: spreadsheetId}).toArray() as IClassificacao[];
}

export const classificacaoFindByIdSheet = async (spreadsheetId:string, idSheet:number) => {
    const col = await classificacaoCollection;
    return await col.find({spreadsheetId:spreadsheetId, idSheet: idSheet}).toArray() as IClassificacao[];
}

export const classificacaoFindByIdSheetAndVersion = async (spreadsheetId:string, idSheet:number, version:number) => {
    const col = await classificacaoCollection;
    return await col.find({spreadsheetId:spreadsheetId, idSheet: idSheet, version:version}).toArray() as IClassificacao[];
}