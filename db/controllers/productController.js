const db = require('../db/db');

const getProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

const addProduct = (req, res) => {
  const { title, price, description, image } = req.body;
  const sql = 'INSERT INTO products (title, price, description, image) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, price, description, image], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: result.insertId, title, price, description, image });
  });
};

module.exports = { getProducts, addProduct };

