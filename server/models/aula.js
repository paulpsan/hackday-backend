"use strict";

export default function(sequelize, DataType) {
  return sequelize.define("Aulas", {
    _id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataType.STRING(100),
      allowNulll: false
    },
    descripcion: {
      type: DataType.STRING(100),
      allowNulll: false
    }
  });
}
