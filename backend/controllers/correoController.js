const { response } = require('express');
const nodeMailer = require('nodemailer');

const envioCorreo = (req=requiered, resp=response) => {

    const {from, asunto, email, mensaje} = req.body   



    let config = nodeMailer.createTransport({
        // pool: true,
        host: 'smtp.datacom.com.bo',
        port: 587,
        // secure: true, // STARTTLS,
        tls:{
            rejectUnauthorized: false
        },
        auth: {
            user: 'infoweb@datacom.com.bo',
            pass: 'D4t4c0m!2023$'
        }
    });

    const opciones = {
        from: 'infoweb@datacom.com.bo',
        subject: asunto,
        to: email,
        html: mensaje
    };

    config.sendMail(opciones, function(error,result){
        if(error) return resp.json({ok:false,msg:error}); 
        return resp.json({
            ok:true,
            msg:result
        })
    })
} 

module.exports = {
    envioCorreo
}