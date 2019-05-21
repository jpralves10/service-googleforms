import { Router } from 'express';
import * as CatalogoController from './catalogo/catalogo.controller';
import * as ClassificacaoController from './classificacao/classificacao.controller';

const router = Router();

router.post('/filtro/catalogo', CatalogoController.filtro);
router.get('/comentario/find', ClassificacaoController.obterComentario);
router.get('/comentario/save', ClassificacaoController.salvarComentario);
router.get('/classificacao/colunas', ClassificacaoController.obterColunas);
router.get('/classificacao/save', ClassificacaoController.saveClassificacao);

/*router.post('/alterar', CatalogoController.alterar);
router.get('/extrato', CatalogoController.extrato);*/

export default router;