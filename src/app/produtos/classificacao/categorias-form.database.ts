import { categoriasFormCollection } from '../../../database/mongodb';
import { ICategoriasForm } from '../../../models/categoriasForm';

/* Categorias Form */

export const categoriasFormularioFindAll = async () => {
    const col = await categoriasFormCollection;
    return await col.find({}).toArray() as ICategoriasForm[];
}

export const categoriasFormularioFindByCodigo = async (codigo:number) => {
    const col = await categoriasFormCollection;
    return await col.find({codigo: codigo}).toArray() as ICategoriasForm[];
}

export const categoriasFormularioFindByCodigoRemove = async (categorias:ICategoriasForm) => {
    const col = await categoriasFormCollection;

    var query = {codigo: categorias.codigo};

    return await col.deleteOne(query).catch(function(e) {
        console.log(e);
    });
}

export const categoriasFormSave = async (categoriasForm:ICategoriasForm) => {
    const col = await categoriasFormCollection;
    await col.insertOne(categoriasForm).catch(function(e) {
        console.log(e);
    });
}

export const categoriasFormUpdate = async (categorias:ICategoriasForm) => {
    const col = await categoriasFormCollection;

    var query = {codigo: categorias.codigo};
    var newCategorias = {$set: categorias};

    await col.updateOne(query, newCategorias).catch(function(e) {
        console.log(e);
    });
}