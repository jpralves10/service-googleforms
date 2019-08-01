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
var db = __importStar(require("./classificar.database"));
var db_classificacao = __importStar(require("./classificacao.database"));
var sheet = __importStar(require("./classificacao.sheet"));
var NotificacoesController = __importStar(require("../shared/notificacoes.controller"));
exports.classificarSave = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var classificar;
    return __generator(this, function (_a) {
        classificar = {};
        classificar.titulo = req.body[1].descricaoBruta;
        classificar.version = 0;
        classificar.status = 'Classificar';
        classificar.dataCriacao = new Date;
        classificar.dataAtualizacao = new Date;
        classificar.rating = 0;
        classificar.ratingComentario = '';
        classificar.usuario = req.body[0];
        classificar.produto = req.body[1];
        db.classificarFindAll().then(function (listdb) {
            var check = false;
            listdb.forEach(function (classificardb) {
                if (classificardb.produto._id == classificar.produto._id) {
                    check = true;
                }
            });
            if (!check) {
                db.classificarFindMaxCodigo().then(function (list) {
                    if (list[0] == undefined) {
                        classificar.codigo = 0;
                    }
                    else {
                        classificar.codigo = (list[0].max + 1);
                    }
                    classificar.classificacao = undefined;
                    //'A1:ZZZ10000'
                    /*let N = classificar.classificacao.respostas.length + 2;
    
                    sheet.setSpreedsheetEmail(
                        classificar.classificacao.spreadsheetId,
                        'B'+N+':'+'B'+N,
                        [classificar.usuario.email]
                    ).then(item => {*/
                    db.classificarSave(classificar).then(function (ret) {
                        /*req.body.opcional = {
                            idEmail: classificar.usuario.email,
                            titulo: 'Classificar Produto',
                            tela: '/classificacao-preencher',
                            produto: classificar.produto._id as string,
                            descricaoProduto: classificar.produto.descricaoBruta
                        }

                        NotificacoesController.setNotificacaoForm(req, res)*/
                    });
                    //})
                });
            }
        });
        res.send('200');
        return [2 /*return*/];
    });
}); };
exports.setClassificar = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var classificar;
    return __generator(this, function (_a) {
        classificar = req.body;
        db.classificarFindByCodigoRemove(classificar).then(function (ret) {
            db.classificarSave(classificar).then(function (listdb) {
                var qtd = 0;
                if (classificar.classificacao == undefined) {
                    qtd = qtd + 2;
                }
                else {
                    qtd = classificar.classificacao.respostas.length + 2;
                }
                sheet.setSpreedsheetEmail(//Email
                '1XJ6yrnv2cni8irh-cGWhWTYZ0ZPYxAXy9UHOEj3sdU8', 'B' + qtd + ':' + 'B' + qtd, [classificar.usuario.email]).then(function (item) {
                    /*sheet.setSpreedsheetEmail( //Código
                        classificar.classificacao.spreadsheetId,
                        'C' + qtd + ':' + 'C' + qtd,
                        [classificar.produto._id]
                    ).then(item => {
                        sheet.setSpreedsheetEmail( //Descricao
                            classificar.classificacao.spreadsheetId,
                            'D' + qtd + ':' + 'D' + qtd,
                            [classificar.produto.descricaoBruta]
                        ).then(item => {
                            sheet.setSpreedsheetEmail( //NCM
                                classificar.classificacao.spreadsheetId,
                                'E' + qtd + ':' + 'E' + qtd,
                                [classificar.produto.ncm]
                            ).then(item => {
                                sheet.setSpreedsheetEmail( //Pais de Orígem
                                    classificar.classificacao.spreadsheetId,
                                    'F' + qtd + ':' + 'F' + qtd,
                                    [classificar.produto.paisOrigem]
                                ).then(item => {
                                    sheet.setSpreedsheetEmail( //Fabricante
                                        classificar.classificacao.spreadsheetId,
                                        'G' + qtd + ':' + 'G' + qtd,
                                        [classificar.produto.fabricanteNome]
                                    ).then(item => {
                                        sheet.setSpreedsheetEmail( //Fornecedor
                                            classificar.classificacao.spreadsheetId,
                                            'H' + qtd + ':' + 'H' + qtd,
                                            [classificar.produto.fornecedorNome]
                                        ).then(item => {})
                                    })
                                })
                            })
                        })
                    })*/
                }).catch(function (error) {
                    console.log(error);
                });
                req.body.opcional = {
                    idEmail: classificar.usuario.email,
                    titulo: 'Classificar Produto',
                    tela: '/classificacao-preencher',
                    produto: classificar.produto._id,
                    descricaoProduto: classificar.produto.descricaoBruta
                };
                NotificacoesController.setNotificacaoForm(req, res);
                res.send('200');
            });
        }).catch(function (error) { });
        return [2 /*return*/];
    });
}); };
exports.getFindClassificar = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
exports.getFindAllClassificar = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        db.classificarFindAll().then(function (classificacoes) {
            classificacoes.length > 0 ? res.send(classificacoes) : res.send([]);
        }).catch(function (e) {
            console.log(e);
        });
        return [2 /*return*/];
    });
}); };
exports.setClassificarUpdate = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var classificar, googleNotes;
    var _this = this;
    return __generator(this, function (_a) {
        classificar = {};
        classificar = req.body;
        db.classificarFindByCodigoRemove(classificar).then(function (ret) {
            db.classificarSave(classificar).then(function (ret2) {
                googleNotes(classificar.classificacao);
            });
        });
        googleNotes = function (classificacao) { return __awaiter(_this, void 0, void 0, function () {
            var parametro;
            return __generator(this, function (_a) {
                classificacao.comentarios.forEach(function (comentario) {
                    comentario;
                });
                classificacao.respostas.forEach(function (resposta) {
                    (resposta.idResposta);
                });
                parametro = {
                    spreadsheetId: classificacao.spreadsheetId,
                    sheetId: classificacao.idSheet,
                    startRowIndex: 1,
                    endRowIndex: 2,
                    startColumnIndex: 1,
                    endColumnIndex: 2,
                    note: 'Teste de Nota de Email'
                };
                console.log(parametro);
                sheet.setSpreedsheetNotes(parametro);
                return [2 /*return*/];
            });
        }); };
        res.send('200');
        return [2 /*return*/];
    });
}); };
exports.setClassificarSpreed = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var classificar, colunas, respostas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                classificar = {};
                classificar = req.body;
                colunas = [];
                respostas = [];
                //console.log('AAA1>> ', classificar.classificacao)
                return [4 /*yield*/, sheet.getSpreedsheet(classificar.classificacao.spreadsheetId, 'A1:ZZZ10000').then(function (item) {
                        item.forEach(function (sheet, i) {
                            i == 0 ?
                                sheet.forEach(function (item) { colunas.push(item); }) :
                                respostas.push(sheet);
                        });
                        //console.log('AAA>> ', item)
                        //if(getVerificarVersao(classificar.classificacao)){
                        classificar.classificacao.respostas = [];
                        respostas.forEach(function (resposta) {
                            var campos = [];
                            var campo;
                            var idResposta = '';
                            var idProduto = '';
                            var carimbo = '';
                            resposta.forEach(function (item, i) {
                                if (i == 0) {
                                    carimbo = item;
                                }
                                else if (i == 1) {
                                    idResposta = item;
                                }
                                else if (i == 2) {
                                    idProduto = item;
                                }
                                else if (i > 2) {
                                    campo = {
                                        'idColuna': classificar.classificacao.colunas[i].idColuna,
                                        'deCampo': item
                                    };
                                    campos.push(campo);
                                }
                            });
                            classificar.classificacao.respostas.push({
                                'idResposta': idResposta,
                                'idProduto': idProduto,
                                'carimbo': carimbo,
                                'campos': campos
                            });
                        });
                        //console.log('AAA3>> ', classificar)
                        //db.classificarUpdate(classificar);
                        db.classificarFindByCodigoRemove(classificar).then(function (ret) {
                            db.classificarSave(classificar).then(function (ret2) {
                                db_classificacao.classificacaoFindByCodigoRemove(classificar.classificacao).then(function (ret) {
                                    db_classificacao.classificacaoSave(classificar.classificacao).then(function (ret2) { });
                                });
                            });
                        });
                        res.send('200');
                        /*}else{
                            res.send('Error: Versão do formulário incompatível!')
                        }*/
                    }).catch(function (err) {
                        var msgError = 'Error: The caller does not have permission!';
                        var error = new RegExp(msgError);
                        if (error.exec(err) != null) {
                            res.send(msgError);
                        }
                        else {
                            res.send('Error');
                        }
                    })];
            case 1:
                //console.log('AAA1>> ', classificar.classificacao)
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
