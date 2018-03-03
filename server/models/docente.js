"use strict";

export default function(sequelize, DataType) {
  return sequelize.define("Docentes", {
    _id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataType.STRING(100),
      allowNulll: false
    },
    email: {
      type: DataType.STRING(100),
      allowNulll: false
    }
  });
}
