const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./banco.db");

db.serialize(() => {
  // Criar tabela de cursos
  db.run(`
    CREATE TABLE IF NOT EXISTS cursos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL
    );
  `);

  // Criar tabela de alunos com chave estrangeira
  db.run(`
    CREATE TABLE IF NOT EXISTS alunos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      curso_id INTEGER,
      FOREIGN KEY (curso_id) REFERENCES cursos(id)
    );
  `);
});

module.exports = db;
