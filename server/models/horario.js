"use strict";

export default function(sequelize, DataType) {
  return sequelize.define("Horarios", {
    _id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    dia: {
      type: DataType.DATE,
      allowNulll: false
    },
    hora_ini: {
      type: DataType.STRING(100),
      allowNulll: false
    },
     hora_fin: {
      type: DataType.STRING(100),
      allowNulll: false
    }
  });
}
