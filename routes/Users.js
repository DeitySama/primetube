const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js')
const {createUser,loginUser, logout} = require('../controllers/User.js')

router.route('/')
.post(auth,createUser)
.get()

router.route('/login')
.post(loginUser)
.put(logout)

router.route('/:id')
.put()
.get()
.delete()

module.exports = router;