"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var classificacao_1 = require("../../../models/classificacao");
var db = __importStar(require("./classificacao.database"));
var classificacao_mock_1 = __importDefault(require("./classificacao.mock"));
//var request = require('request');
// Classificacao
exports.setClassificacao = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var sheets, count, header, colunas, respostas, getHeader, getColunas, getRespostas;
    var _this = this;
    return __generator(this, function (_a) {
        sheets = classificacao_mock_1.default;
        count = 0;
        header = [];
        colunas = [];
        respostas = [];
        sheets.forEach(function (sheet) {
            if (count == 0) {
                sheet.forEach(function (item) { header.push(item); });
            }
            else if (count == 1) {
                sheet.forEach(function (item) { colunas.push(item); });
            }
            else {
                respostas.push(sheet);
            }
            count++;
        });
        db.classificacaoFindByIdSheet(header[0]).then(function (classificacoes) {
            if (classificacoes.length <= 0) {
                var classificacao = new classificacao_1.Classificacao();
                getHeader(classificacao);
                getColunas(classificacao);
                getRespostas(classificacao);
                db.classificacaoSave(classificacao);
            }
            else {
                var classificacao = classificacoes[0];
                classificacao.respostas = [];
                getRespostas(classificacao);
                db.classificacaoUpdate(classificacao);
            }
        }).catch(function (e) {
            console.log(e);
        });
        getHeader = function (classificacao) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                header.forEach(function (item, i) {
                    i == 0 ?
                        classificacao.idSheet = item :
                        classificacao.nmSheet = item;
                });
                return [2 /*return*/];
            });
        }); };
        getColunas = function (classificacao) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                colunas.forEach(function (item, i) {
                    classificacao.colunas.push({
                        'idColuna': i,
                        'nmColuna': item
                    });
                });
                return [2 /*return*/];
            });
        }); };
        getRespostas = function (classificacao) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                respostas.forEach(function (resposta) {
                    var campos = [];
                    var campo;
                    var idResposta = '';
                    var carimbo = '';
                    resposta.forEach(function (item, i) {
                        if (i == 0) {
                            carimbo = item;
                        }
                        else if (i == 1) {
                            idResposta = item;
                        }
                        else if (i > 1) {
                            campo = {
                                'idColuna': classificacao.colunas[i].idColuna,
                                'deCampo': item
                            };
                            campos.push(campo);
                        }
                    });
                    classificacao.respostas.push({
                        'idResposta': idResposta,
                        'carimbo': carimbo,
                        'campos': campos
                    });
                });
                return [2 /*return*/];
            });
        }); };
        res.sendStatus(200);
        return [2 /*return*/];
    });
}); };
exports.getClassificacao = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var classificacao;
    return __generator(this, function (_a) {
        classificacao = req.body;
        db.classificacaoFindByIdSheet(classificacao.idSheet).then(function (classificacoes) {
            if (classificacoes.length == 1) {
                res.send(classificacoes[0]);
            }
            else {
                res.send({});
            }
        }).catch(function (e) {
            console.log(e);
        });
        return [2 /*return*/];
    });
}); };
// Colunas
exports.getColunas = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var parametros;
    return __generator(this, function (_a) {
        parametros = req.body;
        console.log(parametros);
        db.classificacaoFindByIdSheet(parametros.idSheet).then(function (classificacoes) {
            if (classificacoes.length > 0) {
                classificacoes.forEach(function (classificacao) {
                    if (classificacao.colunas.length > 0) {
                        res.send(classificacao.colunas);
                    }
                    else {
                        res.send([]);
                    }
                });
            }
            else {
                res.send([]);
            }
        });
        return [2 /*return*/];
    });
}); };
// Comentario
exports.getComentarios = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var parametros, comentarios;
    return __generator(this, function (_a) {
        parametros = {
            idSheet: 1997890537,
            idResposta: 'jean@eficilog.com'
        };
        comentarios = [];
        db.classificacaoFindByIdSheet(parametros.idSheet).then(function (classificacoes) {
            if (classificacoes.length > 0) {
                classificacoes.forEach(function (classificacao) {
                    if (classificacao.comentarios.length > 0) {
                        classificacao.comentarios.forEach(function (dbcomentario) {
                            if (dbcomentario.idResposta == parametros.idResposta) {
                                comentarios.push(dbcomentario);
                            }
                        });
                        res.send(comentarios);
                    }
                    else {
                        res.send([]);
                    }
                });
            }
        });
        return [2 /*return*/];
    });
}); };
exports.setComentario = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var comentario;
    return __generator(this, function (_a) {
        comentario = req.body;
        db.classificacaoFindByIdSheet(comentario.idSheet).then(function (classificacoes) {
            if (classificacoes.length == 1) {
                classificacoes.forEach(function (classificacao) {
                    if (classificacao.comentarios.length > 0) {
                        var flcomentario_1 = false;
                        var idComentarioMax = Math.max.apply(Math, classificacao.comentarios.map(function (maxCom) {
                            return maxCom.idComentario;
                        }));
                        classificacao.comentarios.forEach(function (dbcomentario) {
                            if (dbcomentario.idComentario == comentario.idComentario &&
                                dbcomentario.idResposta == comentario.idResposta &&
                                dbcomentario.idColuna == comentario.idColuna) {
                                dbcomentario.descricao = comentario.descricao;
                                dbcomentario.status = comentario.status;
                                dbcomentario.dataAtualizacao = new Date();
                                flcomentario_1 = true;
                            }
                        });
                        if (flcomentario_1) {
                            db.classificacaoUpdate(classificacao);
                        }
                        else {
                            comentario.idComentario = ++idComentarioMax;
                            classificacao.comentarios.push(comentario);
                            db.classificacaoUpdate(classificacao);
                        }
                    }
                    else {
                        comentario.idComentario = 0;
                        classificacao.comentarios.push(comentario);
                        db.classificacaoUpdate(classificacao);
                    }
                });
                res.send(classificacoes[0]);
            }
        }).catch(function (e) {
            console.log(e);
        });
        return [2 /*return*/];
    });
}); };
