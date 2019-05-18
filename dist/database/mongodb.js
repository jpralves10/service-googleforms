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
exports.crawlerDB = exports.connection.then(function (conn) { return conn.db('crawler'); });
/* Collections */
exports.produtosCollection = exports.crawlerDB.then(function (db) {
    return db.collection('produtos');
});
exports.integradosCollection = exports.crawlerDB.then(function (db) {
    return db.collection('produtosIntegrados');
});
exports.comentariosCollection = exports.crawlerDB.then(function (db) {
    return db.collection('comentarios');
});
