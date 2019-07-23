import { Request, Response } from 'express';
import * as db from './empresa.database'
import { IEmpresa } from 'src/models/empresa';

export const setEmpresaUpdate = async (req: Request, res: Response) => {

    let empresa = {} as IEmpresa;
    empresa = req.body

    db.empresaFindByCodigoRemove(empresa).then(ret => {
        db.empresaSave(empresa).then(ret2 => {
            res.send('200')
        })
    }).catch(error => {
        res.send('Error')
    })
}

export const getFindEmpresa = async (req: Request, res: Response) => {

    /*let empresa = req.body

    db.empresaFindByCodigo(empresa.codigo).then((empresa) => {
        res.send(empresa)
    }).catch(function(e) { console.log(e);})*/
}

export const getFindAllEmpresa = async (req: Request, res: Response) => {

    db.empresaFindAll().then((empresa) => {
        empresa.length > 0 ? res.send(empresa) : res.send([]);
    }).catch(function(e) {
        console.log(e);
    })
}