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
var spreadsheetId = '1PZCLAymlsaBO1GLFPGxjZSONkYGwy-tYBeXyIDibjaQ';
// Comentario
exports.getFindComentarios = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var parametros, comentarios;
    return __generator(this, function (_a) {
        parametros = {
            spreadsheetId: '1PZCLAymlsaBO1GLFPGxjZSONkYGwy-tYBeXyIDibjaQ',
            idSheet: 1997890537,
            idResposta: 'jean@eficilog.com',
            idProduto: 'jean@eficilog.com'
        };
        comentarios = [];
        db.classificacaoFindBySpreadsheetId(parametros.spreadsheetId).then(function (classificacoes) {
            if (classificacoes.length > 0) {
                classificacoes.forEach(function (classificacao) {
                    if (classificacao.comentarios.length > 0) {
                        classificacao.comentarios.forEach(function (dbcomentario) {
                            if (dbcomentario.idResposta == parametros.idResposta &&
                                dbcomentario.idProduto == parametros.idProduto) {
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
exports.setComentarios = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var comentarios, comentario_1, getIdComentario, setSortComentarios, googleNotes;
    var _this = this;
    return __generator(this, function (_a) {
        comentarios = req.body;
        if (comentarios.length > 0) {
            comentario_1 = comentarios[0];
            db.classificacaoFindByIdSheetAndVersion(comentario_1.spreadsheetId, comentario_1.idSheet, comentario_1.sheetVersao).then(function (classificacoes) {
                var classificacao = classificacoes[0];
                var flcomentario = false;
                classificacao.comentarios.forEach(function (dbcomentario) {
                    if (dbcomentario.idComentario == comentario_1.idComentario &&
                        dbcomentario.idResposta == comentario_1.idResposta &&
                        dbcomentario.idProduto == comentario_1.idProduto &&
                        dbcomentario.idColuna == comentario_1.idColuna) {
                        dbcomentario.descricao = comentario_1.descricao;
                        dbcomentario.status = comentario_1.status;
                        dbcomentario.dataAtualizacao = new Date();
                        flcomentario = true;
                    }
                });
                if (flcomentario) {
                    db.classificacaoUpdate(classificacao);
                }
                else {
                    comentario_1.idComentario = getIdComentario(classificacao);
                    classificacao.comentarios.push(comentario_1);
                    db.classificacaoUpdate(classificacao);
                }
                //googleNotes(classificacao)
                res.send([classificacao]);
            }).catch(function (e) {
                console.log(e);
            });
        }
        else {
            res.send([]);
        }
        getIdComentario = function (classificacao) {
            if (classificacao.comentarios.length > 0) {
                var comentarios_1 = classificacao.comentarios.slice();
                setSortComentarios(comentarios_1);
                return (comentarios_1.pop().idComentario + 1);
            }
            else {
                return 0;
            }
        };
        setSortComentarios = function (comentarios) {
            comentarios.sort(function (a, b) { return a.idComentario > b.idComentario ? 1 : -1; });
        };
        googleNotes = function (classificacao) { return __awaiter(_this, void 0, void 0, function () {
            var parametro;
            return __generator(this, function (_a) {
                classificacao.comentarios.forEach(function (comentario) {
                    comentario;
                });
                classificacao.respostas.forEach(function (resposta) {
                    (resposta.idResposta);
                });
                sheet.setSpreedsheetNotes(parametro);
                res.sendStatus(200);
                return [2 /*return*/];
            });
        }); };
        return [2 /*return*/];
    });
}); };
