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
                    db.classificarSave(classificar).then(function (ret) {
                        req.body.opcional = {
                            titulo: 'Classificar Produto',
                            tela: '/classificacao-preencher',
                            produto: classificar.produto._id,
                            descricaoProduto: classificar.produto.descricaoBruta
                        };
                        NotificacoesController.setNotificacaoForm(req, res);
                    });
                });
            }
        });
        res.send('200');
        return [2 /*return*/];
    });
}); };
exports.setClassificar = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
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