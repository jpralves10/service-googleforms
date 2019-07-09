"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = __importDefault(require("mongodb"));
var credentials_1 = require("../config/credentials");
exports.connection = mongodb_1.default.connect(credentials_1.MONGODB_CONNECTIONSTRING, {
    useNewUrlParser: true
});
exports.crawlerDB = exports.connection.then(function (conn) { return conn.db('crawler') || conn.db('heroku_v5w2cb6t'); });
/* Collections */
exports.produtosCollection = exports.crawlerDB.then(function (db) {
    return db.collection('produtos');
});
exports.integradosCollection = exports.crawlerDB.then(function (db) {
    return db.collection('produtosIntegrados');
});
exports.classificacaoCollection = exports.crawlerDB.then(function (db) {
    return db.collection('classificacao');
});
exports.classificarCollection = exports.crawlerDB.then(function (db) {
    return db.collection('classificarProduto');
});
exports.preencherCollection = exports.crawlerDB.then(function (db) {
    return db.collection('preencherForm');
});
exports.categoriasFormCollection = exports.crawlerDB.then(function (db) {
    return db.collection('categoriasForm');
});
exports.notificacoesCollection = exports.crawlerDB.then(function (db) {
    return db.collection('notificacoes');
});
exports.suporteCollection = exports.crawlerDB.then(function (db) {
    return db.collection('suporte');
});
