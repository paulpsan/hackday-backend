"use strict";
import jsonpatch from "fast-json-patch";
import { Horario } from "../sqldb";
import { Materia } from "../sqldb";
import { Aula } from "../sqldb";
function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates).then(updated => {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy().then(() => {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

export function index(req, res) {
  return Horario.findAll({
    include: [{ model: Materia, as: "Materia" }, { model: Aula, as: "Aula" }]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}
// Gets a single Horario from the DB
export function show(req, res) {
  return Horario.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Horario in the DB
export function create(req, res) {
  let obj = {
    dia: req.body.dia,
    hora_ini: req.body.hora_ini,
    hora_fin: req.body.hora_fin,
    fk_materia: req.body.fk_materia,
    fk_aula: req.body.fk_aula
  };
  Horario.find({
    where: {
      dia: obj.dia,
      hora_ini: obj.hora_ini
    }
  }).then(resp => {
    if (!resp) {
      return Horario.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
    }else{
      return res.status(406).send({mensaje:"ya exite ese horario"})
    }
  });
}

// Upserts the given Horario in the DB at the specified ID
export function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  return Horario.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Horario.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Horario in the DB
export function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Horario.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Horario from the DB
export function destroy(req, res) {
  return Horario.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
