const db = require("../config/banco");

module.exports = {
  listar() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM alunos", [], (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  },

  buscarPorId(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM alunos WHERE id = ?", [id], (err, row) => {
        err ? reject(err) : resolve(row);
      });
    });
  },

  criar(dados) {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO alunos (nome, email, id_curso) VALUES (?, ?, ?)",
        [dados.nome, dados.email, dados.id_curso],
        function(err) {
          err ? reject(err) : resolve({ id: this.lastID, ...dados });
        }
      );
    });
  },

  atualizar(id, dados) {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE alunos SET nome = ?, email = ?, id_curso = ? WHERE id = ?",
        [dados.nome, dados.email, dados.id_curso, id],
        function(err) {
          err ? reject(err) : resolve({ id, ...dados });
        }
      );
    });
  },

  deletar(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM alunos WHERE id = ?", [id], function(err) {
        err ? reject(err) : resolve();
      });
    });
  }
};
