import { empresaCollection } from '../../../database/mongodb';
import { IEmpresa } from 'src/models/empresa';
import { ObjectId } from 'bson';

// Empresa

export const empresaSave = async (empresa:IEmpresa) => {
    const col = await empresaCollection;
    await col.insertOne(empresa).catch(function(e) {
        console.log(e);
    });
}

export const empresaUpdate = async (empresa:IEmpresa) => {
    const col = await empresaCollection;

    var query = {codigo: empresa.codigo};
    var newEmpresa = {$set: empresa};

    await col.updateOne(query, newEmpresa).catch(function(e) {
        console.log(e);
    });
}

export const empresaFindByCodigoRemove = async (empresa:IEmpresa) => {
    const col = await empresaCollection;

    var query = {codigo: empresa.codigo};
    return await col.deleteOne(query).catch(function(e) {
        console.log(e);
    });
}

export const empresaFindAll = async () => {
    const col = await empresaCollection;
    return await col.find({}).toArray() as IEmpresa[];
}

export const empresaFindByCodigo = async (codigo:number) => {
    const col = await empresaCollection;
    return await col.find({codigo: codigo}).toArray() as IEmpresa[];
}

export const empresaFindMaxCodigo = async () => {
    const col = await empresaCollection;
    return await col.aggregate([{ $group : { _id: null, max: { $max : "$codigo" }}}]).toArray() as any;
}

/*export const classificacaoFindByIdCodigoAndVersion = async (spreadsheetId:string, idSheet:string, version:number) => {
    const col = await empresaCollection;
    return await col.find({spreadsheetId:spreadsheetId, idSheet: idSheet, version:version}).toArray() as IEmpresa[];
}*/