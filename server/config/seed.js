/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

"use strict";
import sqldb from "../sqldb";
import config from "./environment/";

export default function seedDatabaseIfNeeded() {
  if (config.seedDB) {
    let Sala = sqldb.Sala;
    let salas;
    let Persona = sqldb.Persona;
    let persona;

    return Sala.destroy({
      where: {}
    })
      .then(() => {
        return Sala.bulkCreate(
          [
            {
              nombre: "Gitlab GeoBolivia",
              urlRepositorio: "https://gitlab.geo.gob.bo",
              descripcion: "gitlab"
            },
          ],
          {
            returning: true
          }
        );
      })
      .then(resultado => {
        salas = resultado;
        console.log("Se crearon salas de prueba");
        return Persona.destroy({
          where: {}
        });
      })
      .then(() => {
        return Persona.bulkCreate(
          [
            {
              nombre: "paul sanchez",
              email : "paulpsan@gamil.com",
              reserva:{
                sala:"primera_sala",
                fecha:"25/01/2018",
                hora:"20:00"
              }
            },
          ],
          {
            returning: true
          }
        );
      })
      .catch(err => console.log("error populating things", err));
  }
}
