import { classificarCollection } from '../../../database/mongodb';
import { IClassificar } from 'src/models/classificar';
import { ObjectId } from 'bson';

// Classificar

export const classificarSave = async (classificar:IClassificar) => {
    const col = await classificarCollection;
    await col.insertOne(classificar).catch(function(e) {
        console.log(e);
    });
}

export const classificarUpdate = async (classificar:IClassificar) => {
    const col = await classificarCollection;

    var query = {codigo: classificar.codigo};
    var newClassificar = {$set: classificar};

    await col.updateOne(query, newClassificar).catch(function(e) {
        console.log(e);
    });
}

export const classificarFindByCodigoRemove = async (classificar:IClassificar) => {
    const col = await classificarCollection;

    var query = {codigo: classificar.codigo};
    return await col.deleteOne(query).catch(function(e) {
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