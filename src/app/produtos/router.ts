import { Router } from 'express';
import * as CatalogoController from './catalogo/catalogo.controller';
import * as ClassificacaoController from './classificacao/classificacao.controller';

const router = Router();

router.post('/filtro/catalogo', CatalogoController.filtro);
router.get('/comentario/find', ClassificacaoController.getComentarios);
router.post('/comentario/save', ClassificacaoController.setComentario);
router.post('/classificacao/find', ClassificacaoController.getClassificacao);
router.get('/classificacao/save', ClassificacaoController.setClassificacao);

/*router.post('/alterar', CatalogoController.alterar);
router.get('/extrato', CatalogoController.extrato);*/

export default router;