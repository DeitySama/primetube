const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js')

router.route('/')
.get((req,res,next)=>res.render('index'))

router.route('/login')
.get((req,res,next)=>res.render('login'));

router.route('/admin')
.get(auth,(req,res,next)=>res.render('admin'));

module.exports = router;