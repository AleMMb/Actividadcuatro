const express = require("express");
const app = express();
const pool = require("./db"); //Estoy usando una base de datos
const PORT = 3000;

app.use(express.static("public")); //pienso completarlo con un frontend para recibir datos de formulario.
app.use(express.json());

app.get("/datos/:id", async (req, res) => {
  /* Endpoint para obtener un registro específico por su id */
  const { id } = req.params; // Capturamos el id desde la URL

  try {
    const result = await pool.query("SELECT * FROM datos WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).send("Registro no encontrado");
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener el registro");
  }
});

app.get("/registros", async (req, res) => {
  /* Endpoint para obtener todos los datos que sería el uso más común de un GET */
  try {
    const result = await pool.query("SELECT * FROM datos ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener datos");
  }
});

app.post("/datos", async (req, res) => {
  /* Endpoint para insertar datos con POST de manera correcta esperando que los datos
  vengan en el body de la petición.*/
  const { nombre, documento, correo, telefono, direccion, valor, concepto } =
    req.body;
  try {
    await pool.query(
      "INSERT INTO datos (nombre, documento, correo, telefono, direccion, valor, concepto) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [nombre, documento, correo, telefono, direccion, valor, concepto]
    );
    res.send("Registro insertado con POST!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al insertar");
  }
});

app.put("/datos/:id", async (req, res) => {
  /* Endpoint para actualizar datos, se espera que el id del registro a actualizar
  venga en la URL y los nuevos datos en el body de la petición. */
  const { id } = req.params;
  const { nombre, documento, correo, telefono, direccion, valor, concepto } =
    req.body;
  try {
    await pool.query(
      "UPDATE datos SET nombre=$1, documento=$2, correo=$3, telefono=$4, direccion=$5, valor=$6, concepto=$7 WHERE id=$8",
      [nombre, documento, correo, telefono, direccion, valor, concepto, id]
    );
    res.send(`Registro con id ${id} actualizado!`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al actualizar");
  }
});

app.delete("/datos/:id", async (req, res) => {
  /* Endpoint para eliminar datos, se espera que el id del registro a eliminar
  venga en la URL. */
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM datos WHERE id=$1", [id]);
    res.send(`Registro con id ${id} eliminado!`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
