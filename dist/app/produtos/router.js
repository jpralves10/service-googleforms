"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CatalogoController = __importStar(require("./catalogo/catalogo.controller"));
var ClassificacaoController = __importStar(require("./classificacao/classificacao.controller"));
var router = express_1.Router();
router.post('/catalogo/filtro', CatalogoController.filtro);
router.get('/comentario-find', ClassificacaoController.comentarioFind);
router.get('/comentario-save', ClassificacaoController.comentarioSave);
router.get('/sheets', ClassificacaoController.sheets);
/*router.post('/alterar', CatalogoController.alterar);
router.get('/extrato', CatalogoController.extrato);*/
exports.default = router;
