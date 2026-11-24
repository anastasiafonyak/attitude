const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
// Разрешаем серверу отдавать все файлы из текущей папки (html, css, js, img)
app.use(express.static(__dirname)); 

const db = new sqlite3.Database('./database.sqlite');

// Создаем таблицу для заявок
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT,
        program TEXT,
        date TEXT
    )`);
});

// Эндпоинт для приема заявок
app.post('/api/apply', (req, res) => {
    const { name, phone, program, date } = req.body;
    
    if (!name || !phone || !program || !date) {
        return res.status(400).json({ error: "Заполните все поля" });
    }

    db.run(
        `INSERT INTO applications (name, phone, program, date) VALUES (?, ?, ?, ?)`,
        [name, phone, program, date],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ success: true, id: this.lastID });
        }
    );
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}/index.html`);
});