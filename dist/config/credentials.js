"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_HOST = process.env.MONGODB_HOST || '35.247.221.210:27017';
exports.MONGODB_USER = process.env.MONGODB_USER || 'maestro';
exports.MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || 'eficimaestro';
exports.MONGODB_AUTHDB = process.env.MONGODB_AUTHDB || 'crawler';
//https://www.youtube.com/watch?v=cRbf_33Rdo4
var URI = "mongodb://" + exports.MONGODB_USER + ":" + exports.MONGODB_PASSWORD + "@" + exports.MONGODB_HOST + "/" + exports.MONGODB_AUTHDB;
var URI_LOCAL = "mongodb://@localhost:27017/crawler";
//export const MONGODB_CONNECTIONSTRING = process.env.MONGODB_URI || URI
exports.MONGODB_CONNECTIONSTRING = URI_LOCAL;
