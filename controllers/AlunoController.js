const Aluno = require("../models/alunoModel");

module.exports = {
  async listar(req, res) {
    try {
      const alunos = await Aluno.buscarTodos();
      return res.status(200).json(alunos);
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao listar alunos" });
    }
  },

  async buscarPorId(req, res) {
    try {
      const aluno = await Aluno.buscarPorId(req.params.id);

      if (!aluno) {
        return res.status(404).json({ erro: "Aluno não encontrado" });
      }

      return res.status(200).json(aluno);
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao buscar aluno" });
    }
  },

  async criar(req, res) {
    try {
      const { nome, id_curso } = req.body;

      if (!nome || !id_curso) {
        return res.status(400).json({ erro: "Nome e id_curso são obrigatórios" });
      }

      await Aluno.criar(nome, id_curso);
      return res.status(201).json({ mensagem: "Aluno criado com sucesso" });
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao criar aluno" });
    }
  },

  async atualizar(req, res) {
    try {
      const { nome, id_curso } = req.body;

      const existe = await Aluno.buscarPorId(req.params.id);
      if (!existe) {
        return res.status(404).json({ erro: "Aluno não encontrado" });
      }

      await Aluno.atualizar(req.params.id, nome, id_curso);
      return res.status(200).json({ mensagem: "Aluno atualizado" });
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao atualizar aluno" });
    }
  },

  async deletar(req, res) {
    try {
      const existe = await Aluno.buscarPorId(req.params.id);
      if (!existe) {
        return res.status(404).json({ erro: "Aluno não encontrado" });
      }

      await Aluno.deletar(req.params.id);
      return res.status(200).json({ mensagem: "Aluno deletado" });
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao deletar aluno" });
    }
  }
};
