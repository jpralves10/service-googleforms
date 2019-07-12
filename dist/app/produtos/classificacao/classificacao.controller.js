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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var db = __importStar(require("./classificacao.database"));
var sheet = __importStar(require("./classificacao.sheet"));
//var request = require('request');
// Classificacao
exports.setClassificacaoEmail = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var parametros;
    return __generator(this, function (_a) {
        parametros = res.body;
        db.classificacaoFindBySpreadsheetId(parametros.spreadsheetId).then(function (classificacoes) {
            if (classificacoes.length > 0) {
                classificacoes.forEach(function (classificacao) {
                    var qtdRespostas = classificacao.respostas.length;
                    var range = 'B' + qtdRespostas + ':' + 'B' + qtdRespostas;
                    sheet.setSpreedsheetEmail(parametros.spreadsheetId, range, [parametros.idResposta]) ?
                        res.send('200') : res.send('400');
                });
            }
        });
        return [2 /*return*/];
    });
}); };
exports.setClassificacao = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var parametros, colunas, respostas, setSortClassificacoes, setNewClassificacao, getHeader, getColunas, getRespostas, getVerificarVersao;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                parametros = req.body[0];
                colunas = [];
                respostas = [];
                //console.log('parametros ', parametros)
                return [4 /*yield*/, sheet.getSpreedsheet(parametros.spreadsheetId, 'A1:ZZZ100000').then(function (item) {
                        item.forEach(function (sheet, i) {
                            i == 0 ?
                                sheet.forEach(function (item) { colunas.push(item); }) :
                                respostas.push(sheet);
                        });
                        db.classificacaoFindByIdSheet(parametros.spreadsheetId, parametros.idSheet).then(function (classificacoes) {
                            if (classificacoes.length == 0) {
                                setNewClassificacao(0);
                            }
                            else {
                                setSortClassificacoes(classificacoes);
                                var classificacao = classificacoes[0];
                                if (getVerificarVersao(classificacao)) {
                                    classificacao.respostas = [];
                                    getHeader(classificacao);
                                    getRespostas(classificacao);
                                    db.classificacaoUpdate(classificacao);
                                }
                                else {
                                    setNewClassificacao(++classificacao.version);
                                }
                            }
                            res.send('200');
                        }).catch(function (e) {
                            console.log(e);
                        });
                    }).catch(function (err) {
                        var msgError = 'Error: The caller does not have permission';
                        var error = new RegExp(msgError);
                        if (error.exec(err) != null) {
                            res.send(msgError);
                        }
                    })];
            case 1:
                //console.log('parametros ', parametros)
                _a.sent();
                setSortClassificacoes = function (classificacoes) {
                    classificacoes.sort(function (a, b) { return a.version > b.version ? 1 : -1; });
                };
                setNewClassificacao = function (version) { return __awaiter(_this, void 0, void 0, function () {
                    var classificacao;
                    return __generator(this, function (_a) {
                        classificacao = {};
                        classificacao.version = version;
                        getHeader(classificacao);
                        getColunas(classificacao);
                        getRespostas(classificacao);
                        classificacao.comentarios = [];
                        db.classificacaoSave(classificacao);
                        return [2 /*return*/];
                    });
                }); };
                getHeader = function (classificacao) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        classificacao.spreadsheetId = parametros.spreadsheetId;
                        classificacao.idSheet = parametros.idSheet;
                        classificacao.iframe = parametros.iframe;
                        classificacao.titulo = parametros.titulo;
                        classificacao.status = parametros.status;
                        classificacao.dataCriacao = parametros.dataCriacao;
                        classificacao.dataAtualizacao = parametros.dataAtualizacao;
                        classificacao.categorias = parametros.categorias;
                        return [2 /*return*/];
                    });
                }); };
                getColunas = function (classificacao) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        classificacao.colunas = [];
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
                        classificacao.respostas = [];
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
                getVerificarVersao = function (classificacao) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (classificacao.colunas.length != colunas.length) {
                            return [2 /*return*/, false];
                        }
                        classificacao.colunas.forEach(function (dbcoluna) {
                            var flColuna = false;
                            colunas.forEach(function (coluna) {
                                if (coluna == dbcoluna.nmColuna) {
                                    flColuna = true;
                                }
                            });
                            if (!flColuna) {
                                return false;
                            }
                        });
                        return [2 /*return*/, true];
                    });
                }); };
                return [2 /*return*/];
        }
    });
}); };
exports.getFindClassificacao = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var classificacao;
    return __generator(this, function (_a) {
        classificacao = req.body;
        db.classificacaoFindBySpreadsheetId(classificacao.spreadsheetId).then(function (classificacoes) {
            classificacoes.length > 0 ? res.send(classificacoes) : res.send([]);
        }).catch(function (e) {
            console.log(e);
        });
        return [2 /*return*/];
    });
}); };
exports.getFindAllClassificacao = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        db.classificacaoFindAll().then(function (classificacoes) {
            classificacoes.length > 0 ? res.send(classificacoes) : res.send([]);
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
        db.classificacaoFindBySpreadsheetId(parametros.spreadsheetId).then(function (classificacoes) {
            if (classificacoes.length > 0) {
                classificacoes.forEach(function (classificacao) {
                    classificacao.colunas.length > 0 ? res.send(classificacao.colunas) : res.send([]);
                });
            }
            else {
                res.send([]);
            }
        });
        return [2 /*return*/];
    });
}); };
