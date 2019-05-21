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
router.post('/filtro/catalogo', CatalogoController.filtro);
router.get('/comentario/find', ClassificacaoController.obterComentario);
router.get('/comentario/save', ClassificacaoController.salvarComentario);
router.get('/classificacao/colunas', ClassificacaoController.obterColunas);
router.get('/classificacao/save', ClassificacaoController.saveClassificacao);
/*router.post('/alterar', CatalogoController.alterar);
router.get('/extrato', CatalogoController.extrato);*/
exports.default = router;
