const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');

const {createCategory,deleteCategory,getCategories,getCategory,updateCategory} = require('../controllers/Category.js');

router.route('/')
.post(createCategory)
.get(getCategories)

router.route('/:id')
.put(auth,updateCategory)
.get(getCategory)
.delete(auth,deleteCategory)


module.exports = router;