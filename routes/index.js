const express = require("express");
const rotas = express.Router();

const cursos = require("./cursoRoutes");
const alunos = require("./alunoRoutes");

rotas.use("/cursos", cursos);
rotas.use("/alunos", alunos);

module.exports = rotas;
