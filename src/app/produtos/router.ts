import { Router } from 'express';
import * as CatalogoController from './catalogo/catalogo.controller';
import * as ClassificacaoController from './classificacao/classificacao.controller';

const router = Router();

router.post('/catalogo/filtro', CatalogoController.filtro);
router.get('/comentario-find', ClassificacaoController.comentarioFind);
router.get('/comentario-save', ClassificacaoController.comentarioSave);
router.get('/sheets', ClassificacaoController.sheets);

/*router.post('/alterar', CatalogoController.alterar);
router.get('/extrato', CatalogoController.extrato);*/

export default router;