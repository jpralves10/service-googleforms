import { Router } from 'express';
import * as CatalogoController from './catalogo/catalogo.controller';
import * as ClassificacaoController from './classificacao/classificacao.controller';

//import * as GoogleAuth from './classificacao/classificacao.sheet';

const router = Router();

router.post('/filtro/catalogo', CatalogoController.filtro);

router.get('/comentario/find', ClassificacaoController.getComentarios);
router.post('/comentario/save', ClassificacaoController.setComentarios);

router.post('/classificacao/find', ClassificacaoController.getClassificacao);
router.get('/classificacao/save', ClassificacaoController.setClassificacao);

router.post('/categoriasForm/find', ClassificacaoController.getCategoriasForm);
router.post('/categoriasForm/save', ClassificacaoController.setCategoriasForm);

/*router.post('/alterar', CatalogoController.alterar);
router.get('/extrato', CatalogoController.extrato);*/

export default router;