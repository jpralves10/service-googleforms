//import { ObjectId } from 'bson';
import { preencherCollection } from '../../../database/mongodb';
import { IPreencher } from 'src/models/preencher';

// Preencher

export const preencherSave = async (preencher:IPreencher) => {
    const col = await preencherCollection;
    await col.insertOne(preencher).catch(function(e) {
        console.log(e);
    });
}

export const preencherUpdate = async (preencher:IPreencher) => {
    const col = await preencherCollection;

    var query = {codigo: preencher.codigo};
    var newPreencher = {$set: preencher};

    await col.updateOne(query, newPreencher).catch(function(e) {
        console.log(e);
    });
}

export const preencherFindAll = async () => {
    const col = await preencherCollection;
    return await col.find({}).toArray() as IPreencher[];
}

export const preencherFindByCodigo = async (codigo:number) => {
    const col = await preencherCollection;
    return await col.find({codigo: codigo}).toArray() as IPreencher[];
}

export const preencherFindMaxCodigo = async () => {
    const col = await preencherCollection;
    return await col.aggregate([{ $group : { _id: null, max: { $max : "$codigo" }}}]).toArray() as any;
}