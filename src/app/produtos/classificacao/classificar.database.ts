//import { ObjectId } from 'bson';
import { classificarCollection } from '../../../database/mongodb';
import { IClassificar } from 'src/models/classificar';

// Classificar

export const classificarSave = async (classificar:IClassificar) => {
    const col = await classificarCollection;
    await col.insertOne(classificar).catch(function(e) {
        console.log(e);
    });
}

export const classificacaoUpdate = async (classificar:IClassificar) => {
    const col = await classificarCollection;

    var query = {codigo: classificar.codigo};
    var newClassificar = {$set: classificar};

    await col.updateOne(query, newClassificar).catch(function(e) {
        console.log(e);
    });
}

export const classificarFindAll = async () => {
    const col = await classificarCollection;
    return await col.find({}).toArray() as IClassificar[];
}

export const classificarFindByCodigo = async (codigo:number) => {
    const col = await classificarCollection;
    return await col.find({codigo: codigo}).toArray() as IClassificar[];
}

export const classificarFindMaxCodigo = async () => {
    const col = await classificarCollection;
    return await col.aggregate([{ $group : { _id: null, max: { $max : "$codigo" }}}]).toArray() as any;
}

/*export const classificacaoFindByIdCodigoAndVersion = async (spreadsheetId:string, idSheet:string, version:number) => {
    const col = await classificarCollection;
    return await col.find({spreadsheetId:spreadsheetId, idSheet: idSheet, version:version}).toArray() as IClassificar[];
}*/