//Rutas para productos
const express = require('express');
const router = express.Router();
const marcacionesmongoController = require('../controllers/marcacionesmongoController')
const marcacionesController = require('../controllers/marcacionesController')
const jwt = require('jsonwebtoken');


router.get('/:id', verifyToken, marcacionesController.obtenerMarcaciones);
router.post('/', verifyToken, marcacionesController.buscarMarcaciones);
router.post('/registrar/', verifyToken, marcacionesController.guardaMarcaciones);
router.post('/salida/', verifyToken, marcacionesController.salidaMarcaciones);

//REPORTE
router.post('/plataforma/', verifyToken, marcacionesController.obtenerPlataformas);
router.post('/usuarios/', verifyToken, marcacionesController.obtenerUsuarios);

function verifyToken(req,res, next){

    if(!req.headers.authorization) return res.status(401).json('Token Vacio');

    const token = req.headers.authorization.substr(7);
    //console.log(token)
    if(token!==''){
       // const content = jwt.verify(token,'demian', (err, result) => { return res.status(200).send({ err: err, result: result, }); });
        const content = jwt.verify(token,'demian', function (err, result) {
            if (err) {
                return res.status(401).json({ error: 'Token inválido o expirado' });
            }
                req.data = result;
                next();
          });
        
    }else{
        res.status(401).json({error: 'Token vacio'});
    }
}



module.exports = router;