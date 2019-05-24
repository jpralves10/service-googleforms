import mongo from 'mongodb';
import { MONGODB_CONNECTIONSTRING } from '../config/credentials';

import { Produto } from '../models/produtos';
import { Classificacao } from '../models/classificacao';

export const connection = mongo.connect(MONGODB_CONNECTIONSTRING, {
  useNewUrlParser: true
});

export const crawlerDB = connection.then(conn => conn.db('heroku_v5w2cb6t')); //conn.db('crawler'));

/* Collections */

export const produtosCollection = crawlerDB.then(db =>
    db.collection<Produto>('produtos')
);

export const integradosCollection = crawlerDB.then(db =>
    db.collection<Produto>('produtosIntegrados')
);

export const classificacaoCollection = crawlerDB.then(db =>
    db.collection<Classificacao>('classificacao')
);