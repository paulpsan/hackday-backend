"use strict";

export default app => {
  app.use("/api/aulas", require("./routes/aula"));
  app.use("/api/docentes", require("./routes/docente"));
  app.use("/api/horarios", require("./routes/horario"));
  app.use("/api/materias", require("./routes/materia"));

};
