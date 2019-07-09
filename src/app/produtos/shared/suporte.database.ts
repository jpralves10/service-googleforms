//import { ObjectId } from 'bson';
import { suporteCollection } from '../../../database/mongodb';
import { ISuporte } from 'src/models/suporte';

// Suporte

export const suporteSave = async (suporte:ISuporte) => {
    const col = await suporteCollection;
    await col.insertOne(suporte).catch(function(e) {
        console.log(e);
    });
}

export const suporteUpdate = async (suporte:ISuporte) => {
    const col = await suporteCollection;

    var query = {codigo: suporte.codigo};
    var newSuporte = {$set: suporte};

    await col.updateOne(query, newSuporte).catch(function(e) {
        console.log(e);
    });
}

export const suporteFindAll = async () => {
    const col = await suporteCollection;
    return await col.find({}).toArray() as ISuporte[];
}

export const suporteFindByCodigo = async (codigo:number) => {
    const col = await suporteCollection;
    return await col.find({codigo: codigo}).toArray() as ISuporte[];
}

export const suporteFindMaxCodigo = async () => {
    const col = await suporteCollection;
    return await col.aggregate([{ $group : { _id: null, max: { $max : "$codigo" }}}]).toArray() as any;
}

/*export const classificacaoFindByIdCodigoAndVersion = async (spreadsheetId:string, idSheet:string, version:number) => {
    const col = await suporteCollection;
    return await col.find({spreadsheetId:spreadsheetId, idSheet: idSheet, version:version}).toArray() as ISuporte[];
}*/