const Curso = require("../models/cursoModel");

module.exports = {
  async listar(req, res) {
    try {
      const cursos = await Curso.buscarTodos();
      return res.status(200).json(cursos);
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao listar cursos" });
    }
  },

  async buscarPorId(req, res) {
    try {
      const curso = await Curso.buscarPorId(req.params.id);
      if (!curso) {
        return res.status(404).json({ erro: "Curso não encontrado" });
      }
      return res.status(200).json(curso);
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao buscar curso" });
    }
  },

  async criar(req, res) {
    try {
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ erro: "O nome é obrigatório" });
      }

      await Curso.criar(nome);
      return res.status(201).json({ mensagem: "Curso criado com sucesso" });
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao criar curso" });
    }
  },

  async atualizar(req, res) {
    try {
      const { nome } = req.body;

      const existe = await Curso.buscarPorId(req.params.id);
      if (!existe) {
        return res.status(404).json({ erro: "Curso não encontrado" });
      }

      await Curso.atualizar(req.params.id, nome);
      return res.status(200).json({ mensagem: "Curso atualizado" });
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao atualizar curso" });
    }
  },

  async deletar(req, res) {
    try {
      const existe = await Curso.buscarPorId(req.params.id);
      if (!existe) {
        return res.status(404).json({ erro: "Curso não encontrado" });
      }

      await Curso.deletar(req.params.id);
      return res.status(200).json({ mensagem: "Curso deletado" });
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao deletar curso" });
    }
  }
};
