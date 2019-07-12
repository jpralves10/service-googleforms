import { Router } from 'express';
import * as CatalogoController from './catalogo/catalogo.controller';
import * as ClassificacaoController from './classificacao/classificacao.controller';
import * as ComentariosControlller from './classificacao/comentarios.controller';
import * as CategoriasControlller from './classificacao/categorias-form.controller';
import * as NotificacoesController from './shared/notificacoes.controller';
import * as ClassificarController from './classificacao/classificar.controller';

//import * as GoogleAuth from './classificacao/classificacao.sheet';

const router = Router();

router.post('/filtro/catalogo', CatalogoController.filtro);

router.post('/comentario/find', ComentariosControlller.getFindComentarios);
router.post('/comentario/save', ComentariosControlller.setComentarios);

router.post('/classificacao/findAll', ClassificacaoController.getFindAllClassificacao);
router.post('/classificacao/find', ClassificacaoController.getFindClassificacao);
router.post('/classificacao/save', ClassificacaoController.setClassificacao);

/* Avaliar>>> */
router.post('/classificar/classificarSave', ClassificarController.classificarSave);
router.post('/classificar/save', ClassificarController.setClassificar);
router.post('/classificar/findAll', ClassificarController.getFindAllClassificar);
router.post('/classificar/find', ClassificarController.getFindClassificar);
/* >>> */

router.post('/notificacoes/findAll', NotificacoesController.getFindAllNotificacoes);
router.post('/notificacoes/saveNotificacao', NotificacoesController.setNotificacao);
router.post('/notificacoes/remove', NotificacoesController.delNotificacoesForm);

router.post('/categoriasForm/find', CategoriasControlller.getFindCategoriasForm);
router.post('/categoriasForm/save', CategoriasControlller.setCategoriasForm);
router.post('/categoriasForm/remove', CategoriasControlller.delCategoriasForm);

export default router;