const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

let envio = require('../controllers/correoController');

app.post('/', verifyToken, envio.envioCorreo);

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

module.exports = app;