const db = require("../config/banco");

module.exports = {
  listar() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM cursos", [], (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  },

  buscarPorId(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM cursos WHERE id = ?", [id], (err, row) => {
        err ? reject(err) : resolve(row);
      });
    });
  },

  criar(dados) {
    return new Promise((resolve, reject) => {
      db.run("INSERT INTO cursos (nome) VALUES (?)", [dados.nome], function(err) {
        err ? reject(err) : resolve({ id: this.lastID, ...dados });
      });
    });
  },

  atualizar(id, dados) {
    return new Promise((resolve, reject) => {
      db.run("UPDATE cursos SET nome = ? WHERE id = ?", [dados.nome, id], function(err) {
        err ? reject(err) : resolve({ id, ...dados });
      });
    });
  },

  deletar(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM cursos WHERE id = ?", [id], function(err) {
        err ? reject(err) : resolve();
      });
    });
  }
};
