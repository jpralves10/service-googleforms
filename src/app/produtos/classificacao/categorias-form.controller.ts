import { Request, Response } from 'express';
import { ICategoriasForm } from 'src/models/categoriasForm';
import * as db from './categorias-form.database'

const spreadsheetId = '1PZCLAymlsaBO1GLFPGxjZSONkYGwy-tYBeXyIDibjaQ';

export const getFindCategoriasForm = async (req: Request, res: Response) => {

    let categoria = req.body

    if(categoria.codigo != undefined){
        db.categoriasFormularioFindByCodigo(categoria.codigo).then((categorias) => {
            res.send(categorias)
        })
    }else{
        db.categoriasFormularioFindAll().then(categorias => {
            res.send(categorias)
        })
    }
}

export const setCategoriasForm = async (req: Request, res: Response) => {

    let categoria = req.body;

    db.categoriasFormularioFindAll().then(categorias => {

        let flCategoria = false;

        if(categorias.length > 0){
            categorias.forEach(dbcategoria => {
                if(categoria.codigo == dbcategoria.codigo){
                    dbcategoria.descricao = categoria.descricao
                    db.categoriasFormUpdate(dbcategoria);
                    flCategoria = true
                }
            })

            if(!flCategoria){
                categoria.codigo = getCodigoCategoria(categorias);
                db.categoriasFormSave(categoria);
            }
        }else{
            categoria.codigo = getCodigoCategoria(categorias);
            let ret = db.categoriasFormSave(categoria);
        }

        res.send('200')
    })

    const getCodigoCategoria = (categorias:ICategoriasForm[]) => {
        if(categorias.length > 0){
            let newCategorias = [...categorias];
            setSortCategorias(newCategorias)
            return (categorias.pop().codigo + 1);
        }else{
            return 0;
        }
    }

    const setSortCategorias = (categorias:any) => {
        categorias.sort((a, b) => a.codigo > b.codigo ? 1 : -1 );
    }
}

export const delCategoriasForm = async (req: Request, res: Response) => {

    let categoria = req.body;

    if(categoria.codigo != undefined){
        db.categoriasFormularioFindByCodigoRemove(categoria).then(() => {
            res.send('200')
        })
    }
}