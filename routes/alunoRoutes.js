const express = require("express");
const rotas = express.Router();
const controller = require("../controllers/alunoController");

rotas.get("/", controller.listar);
rotas.get("/:id", controller.buscarPorId);
rotas.post("/", controller.criar);
rotas.put("/:id", controller.atualizar);
rotas.delete("/:id", controller.deletar);

module.exports = rotas;
