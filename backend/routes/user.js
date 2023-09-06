const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var path = require('path');

const Sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');

const mysqlConnection = require('../config/mariadb');


// create application/json parser
var jsonParser = bodyParser.json()



router.get('/', (req,res)=>{
    mysqlConnection.query('select * from USERS', (err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.post('/singin', jsonParser, function(req,res)  {
    const { userName, pass } = req.body;    
    mysqlConnection.sequelize.query("SELECT * FROM TOKEN WHERE  USER_NAME=? AND  ENCRYPTED_USER_PASSWORD=MD5(?)",
   
    {
        replacements: [userName, pass],
        type: QueryTypes.SELECT
    }, (err, rows) => {
            //console.log(rows)
            if (err) throw err;
            console.log(err)
        }).then(function (result){
            if(result.length >0){
                let data = result[0];
                const token = jwt.sign( {data},'demian',{ expiresIn: '1h' } );
                //const token = jwt.sign( {data},'demian',{ expiresIn: '30m' } );
                res.json({token});
            }else{
                res.json('Usuario o clave incorrecto')
            }
   
});

    
    

});

router.post('/test', verifyToken, (req,res) => {
   
    const datatoken = JSON.parse(req.data.data);
    if(datatoken.plataforma==='TDI'){
        res.json('Informacion secreta para plataforma TDI '+ datatoken.USER_NAME);
    }else{
        res.json('Informacion para otra plataforma '+ datatoken.USER_NAME );
    }        
 
})

function verifyToken(req,res, next){

    if(!req.headers.authorization) return res.status(401).json('Token Vacio');

    const token = req.headers.authorization.substr(7);
    if(token!==''){
       // const content = jwt.verify(token,'demian', (err, result) => { return res.status(200).send({ err: err, result: result, }); });
        const content = jwt.verify(token,'demian', function (err, result) {
            if (err) {
                req.data = res.status(401).json('Token No Valido');
            }
                req.data = result;
                next();
          });
        
    }else{
        res.status(401).json('Token vacio');
    }
}

module.exports = router;