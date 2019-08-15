import mongo from 'mongodb';
import { MONGODB_CONNECTIONSTRING } from '../config/credentials';

import { IProduto } from '../models/produtos';
import { IClassificacao } from '../models/classificacao';
import { ICategoriasForm } from '../models/categoriasForm';
import { IClassificar } from 'src/models/classificar';
import { INotificacoes } from 'src/models/notificacoes';
import { ISuporte } from 'src/models/suporte';
import { IEmpresa } from 'src/models/empresa';

export const connection = mongo.connect(MONGODB_CONNECTIONSTRING, {
    useNewUrlParser: true
});

export const crawlerDB = connection.then(conn => conn.db('catalogo-produtos'));

/* Collections */

export const empresaCollection = crawlerDB.then(db =>
    db.collection<IEmpresa>('empresa')
);

export const classificacaoCollection = crawlerDB.then(db =>
    db.collection<IClassificacao>('classificacao')
);

export const classificarCollection = crawlerDB.then(db =>
    db.collection<IClassificar>('classificar')
);

export const categoriasFormCollection = crawlerDB.then(db =>
    db.collection<ICategoriasForm>('categorias')
);

export const notificacoesCollection = crawlerDB.then(db =>
    db.collection<INotificacoes>('notificacoes')
);

export const suporteCollection = crawlerDB.then(db =>
    db.collection<ISuporte>('suporte')
);