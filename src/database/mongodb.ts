import mongo from 'mongodb';
import { MONGODB_CONNECTIONSTRING } from '../config/credentials';

import { IProduto } from '../models/produtos';
import { IClassificacao } from '../models/classificacao';
import { ICategoriasForm } from '../models/categoriasForm';

export const connection = mongo.connect(MONGODB_CONNECTIONSTRING, {
  useNewUrlParser: true
});

export const crawlerDB = connection.then(conn => conn.db('crawler') || conn.db('heroku_v5w2cb6t'));

/* Collections */

export const produtosCollection = crawlerDB.then(db =>
    db.collection<IProduto>('produtos')
);

export const integradosCollection = crawlerDB.then(db =>
    db.collection<IProduto>('produtosIntegrados')
);

export const classificacaoCollection = crawlerDB.then(db =>
    db.collection<IClassificacao>('classificacao')
);

export const categoriasFormCollection = crawlerDB.then(db =>
    db.collection<ICategoriasForm>('categoriasForm')
);