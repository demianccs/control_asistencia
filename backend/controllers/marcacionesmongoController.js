const MarcacionesModel = require("../models/Marcaciones")

exports.crearMarcaciones= async (req,res) => {
    try {
        let tbl_marcacion

        //creamos nuestra plataforma

        tbl_marcacion = new MarcacionesModel(req.body);
        
        await tbl_marcacion.save();
        res.send(tbl_marcacion);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

exports.obtenerMarcacionmdb = async (req,res) => {
    try {
        
        const tbl_marcacion = await MarcacionesModel.find();
        res.json(tbl_marcacion)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

exports.buscarFormulario = async (req,res) => {
    try {
        
        let tbl_marcacion = await MarcacionesModel.findById(req.params.id);

        if(!formutbl_marcacionlario){
            res.status(400).json({ msg: 'No existe el formulario' })
        }

        res.json(tbl_marcacion)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

exports.actualizarFormulario = async (req,res) => {
    try {
        
        const { n_formulario, tipo, contenido, userCreate, userUpdate, obligatorio } = req.body;
        let tbl_marcacion = await MarcacionesModel.findById(req.params.id);

        if(!formulario){
            res.status(400).json({ msg: 'No existe el formulario' })
        }

        tbl_marcacion.n_formulario = n_formulario;
        tbl_marcacion.tipo = tipo;
        tbl_marcacion.obligatorio = obligatorio;
        tbl_marcacion.contenido = contenido;
        tbl_marcacion.userCreate = userCreate;
        tbl_marcacion.userUpdate = userUpdate;

        tbl_marcacion = await MarcacionesModel.findByIdAndUpdate({ _id: req.params.id }, tbl_marcacion, { new: true } );
        res.json(tbl_marcacion)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}