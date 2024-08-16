const express = require('express');
const router = express.Router();

const { createNews, singleNews, allNews, updateNews, deleteNews } = require('../controllers/newsController');
const { userAuth } = require('../middleware/authMiddleware');

router.get('/', userAuth, allNews);
router.get('/:id', userAuth, singleNews);
router.post('/', userAuth, createNews);
router.put('/:id', userAuth, updateNews);
router.delete('/:id', userAuth, deleteNews);


module.exports = router;