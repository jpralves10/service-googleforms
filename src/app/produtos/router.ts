import { Router } from 'express';
import * as CatalogoController from './catalogo/catalogo.controller';
import * as ClassificacaoController from './classificacao/classificacao.controller';
import * as ComentariosControlller from './classificacao/comentarios.controller';
import * as CategoriasControlller from './classificacao/categorias-form.controller';

//import * as GoogleAuth from './classificacao/classificacao.sheet';

const router = Router();

router.post('/filtro/catalogo', CatalogoController.filtro);

router.get('/comentario/find', ComentariosControlller.getComentarios);
router.post('/comentario/save', ComentariosControlller.setComentarios);

router.post('/classificacao/find', ClassificacaoController.getClassificacao);
router.get('/classificacao/save', ClassificacaoController.setClassificacao);

router.post('/categoriasForm/find', CategoriasControlller.getCategoriasForm);
router.post('/categoriasForm/save', CategoriasControlller.setCategoriasForm);
router.post('/categoriasForm/remove', CategoriasControlller.delCategoriasForm);

export default router;