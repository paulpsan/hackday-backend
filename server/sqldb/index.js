'user strict'
import Sequelize from 'sequelize';
import config from '../config/environment'

let db = {
    Sequelize,
    sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
}
db.Aula = db.sequelize.import('../models/aula');
db.Docente=db.sequelize.import('../models/docente');
db.Horario = db.sequelize.import("../models/horario");
db.Materia = db.sequelize.import("../models/materia");
//aqui agregamos inclusiones
/**
 * variable que ayuda con las inclusiones
 * se deben agregar las inclusiones con sus respectivos modelos al nombre de la inclusion
 * esto se usa para los query strings
 */

db.Materia.belongsTo(db.Docente, {
  foreignKey: {
    name: "fk_docente",
    allowNull: false
  },
  as: "Docente"
});

db.Horario.belongsTo(db.Materia, {
  foreignKey: {
    name: "fk_materia",
    allowNull: false
  },
  as: "Materia"
});
db.Horario.belongsTo(db.Aula, {
  foreignKey: {
    name: "fk_aula",
    allowNull: false
  },
  as: "Aula"
});

module.exports=db;
