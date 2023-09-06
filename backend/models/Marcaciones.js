const mongoose = require('mongoose');

const RegistrosSchema = mongoose.Schema(
    {
        id_marcacion: { type:Number, require: true },
        id_user: { type:String, require: true },
        fecha_ingreso: { type:String, require: true },
        hora_ingreso: { type:String, require: true },
        loc_ingreso: { type:String, require: true },
        fecha_salida: { type:String, require: true },
        hora_salida: { type:String, require: true },  
        estado: { type:String, require: true },  
        ip_on: { type:String, require: true },  
        dispositivo_on: { type:String, require: true },  
        so_on: { type:String, require: true },  
        ip_off: { type:String, require: true },  
        dispositivo_off: { type:String, require: true },  
        so_off: { type:String, require: true },  
        trabajo: { type:String, require: true },       
        tiempo_ingreso: { type:String, require: true }, 
    },
    {
        timestamps: true
    }
);
const MarcacionesModel = mongoose.model('registros', RegistrosSchema);

module.exports = MarcacionesModel

