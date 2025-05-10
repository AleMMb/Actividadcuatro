CREATE DATABASE facturacion;
\c facturacion

CREATE TABLE datos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  documento INT,
  correo VARCHAR(100),
  telefono BIGINT,
  direccion VARCHAR(100),
  valor INT,
  concepto VARCHAR(200)
);