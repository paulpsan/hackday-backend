"use strict";

export default function(sequelize, DataType) {
  return sequelize.define("Materias", {
    _id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataType.STRING(100),
      allowNulll: false
    },
    detalle: {
      type: DataType.STRING(100),
      allowNulll: false
    }
  });
}
