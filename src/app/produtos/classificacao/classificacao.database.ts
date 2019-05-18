import { ObjectId } from 'bson';
import {
    comentariosCollection
} from '../../../database/mongodb';

import { Comentario } from '../../../models/comentario';

export const comentario_find = async () => {
    const col = await comentariosCollection;
    return await col.find({ _id: new ObjectId("5cddce5c459c4032445d1307") }).toArray();
}

export const comentario_save = async (comentario:Comentario) => {
    const col = await comentariosCollection;
    await col.insertOne(comentario).then(() => {
        return 'Ok';
    }).catch(function(e) {
        console.log(e);
        return 'Error'
    });
}