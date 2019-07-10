import { ObjectId } from 'bson';
import { notificacoesCollection } from '../../../database/mongodb';
import { INotificacoes } from 'src/models/notificacoes';

// Notificacoes

export const notificacoesSave = async (notificacoes:INotificacoes) => {
    const col = await notificacoesCollection;
    await col.insertOne(notificacoes).catch(function(e) {
        console.log(e);
    });
}

export const notificacoesUpdate = async (notificacoes:INotificacoes) => {
    const col = await notificacoesCollection;

    var query = {codigo: notificacoes.codigo};
    var newNotificacoes = {$set: notificacoes};

    await col.updateOne(query, newNotificacoes).catch(function(e) {
        console.log(e);
    });
}

export const notificacoesFormFindByCodigoRemove = async (notificacoes:INotificacoes) => {
    const col = await notificacoesCollection;

    var query = {_id: new ObjectId(notificacoes._id)};
    return await col.deleteOne(query).catch(function(e) {
        console.log(e);
    });
}

export const notificacoesFindAll = async () => {
    const col = await notificacoesCollection;
    return await col.find({}).toArray() as INotificacoes[];
}

export const notificacoesFindByCodigo = async (codigo:number) => {
    const col = await notificacoesCollection;
    return await col.find({codigo: codigo}).toArray() as INotificacoes[];
}

export const notificacoesFindMaxCodigo = async () => {
    const col = await notificacoesCollection;
    return await col.aggregate([{ $group : { _id: null, max: { $max : "$codigo" }}}]).toArray() as any;
}

/*export const classificacaoFindByIdCodigoAndVersion = async (spreadsheetId:string, idSheet:string, version:number) => {
    const col = await notificacoesCollection;
    return await col.find({spreadsheetId:spreadsheetId, idSheet: idSheet, version:version}).toArray() as INotificacoes[];
}*/