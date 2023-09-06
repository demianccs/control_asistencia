module.exports = (sequelize, Sequelize) => {
    const MarcacionesModel = sequelize.define("tbl_marcacion", {
        id_marcacion: {
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER
      },
      fecha_ingreso: {
        type: Sequelize.DATE
      },
      hora_ingreso: {
        type: Sequelize.TIME
      },
      loc_ingreso: {
        type: Sequelize.STRING
      },
      fecha_salida: {
        type: Sequelize.DATE
      },
      hora_salida: {
        type: Sequelize.TIME
      } ,
      estado: {
        type: Sequelize.INTEGER
      } ,
      ip_on: {
        type: Sequelize.STRING
      } ,
      dispositivo_on: {
        type: Sequelize.STRING
      } ,
      so_on: {
        type: Sequelize.STRING
      } ,
      ip_off: {
        type: Sequelize.STRING
      } ,
      dispositivo_off: {
        type: Sequelize.STRING
      },
      so_off: {
        type: Sequelize.STRING
      },
      trabajo: {
        type: Sequelize.STRING
      }
      
    });
  
    return MarcacionesModel;
  };