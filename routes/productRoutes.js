const express = require('express');
const router = express.Router();
const { getProducts, addProduct } = require('../controllers/productController');
const db = require('../db/db');

router.get('/', getProducts);
router.post('/', addProduct);

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log('Attempting to delete product with ID:', id);

  const sql = 'DELETE FROM products WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json({ message: 'Produit supprimé avec succès' });
  });
});
router.put('/:id', (req, res) => {
    const { title, price, description, image } = req.body;
    const sql = 'UPDATE products SET title=?, price=?, description=?, image=? WHERE id=?';
    db.query(sql, [title, price, description, image, req.params.id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Produit mis à jour' });
    });
  });
  
router.get('/search/:term', (req, res) => {
    const term = req.params.term;
    const sql = 'SELECT * FROM products WHERE title LIKE ?';
    db.query(sql, [`%${term}%`], (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    });
  });
  
module.exports = router;
