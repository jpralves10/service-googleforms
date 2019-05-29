//import { ObjectId } from 'bson';
import {
    classificacaoCollection
} from '../../../database/mongodb';

import { Classificacao, IClassificacao } from '../../../models/classificacao';

// Classificacao

export const classificacaoFindByIdSheet = async (idSheet:string) => {
    const col = await classificacaoCollection;
    return await col.find({idSheet: idSheet}).toArray() as IClassificacao[];
}

export const classificacaoFindByIdSheetAndVersion = async (idSheet:number, version:number) => {
    const col = await classificacaoCollection;
    return await col.find({idSheet: idSheet, version:version}).toArray() as IClassificacao[];
}

export const classificacaoSave = async (classificacao:Classificacao) => {
    const col = await classificacaoCollection;
    await col.insertOne(classificacao).then(() => {
        return true;
    }).catch(function(e) {
        console.log(e);
        return false
    });
}

export const classificacaoUpdate = async (classificacao:Classificacao) => {
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