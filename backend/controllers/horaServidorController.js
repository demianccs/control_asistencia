const pool = require("../config/marcaciones");
const moment = require('moment');

exports.obtenerhoraServidor = async (req, res) => { 
    const unix = moment.unix(moment().unix()).subtract(4, 'hours').unix();    
    const horaActual = moment.unix(unix).format('HH:mm:ss');
    const FechaActual = moment.unix(unix).format('YYYY-MM-DD');    
    res.json({ horaActual: horaActual, FechaActual: FechaActual, unixTimestampActual: unix });
}







