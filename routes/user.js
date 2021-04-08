const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware, adminMiddleware } = require('../controllers/auth');
const { read, psyPatients, update, remove,photo } = require('../controllers/user');



router.get('/user/:id',psyPatients);
router.put('/user/update', requireSignin, authMiddleware, update);
router.delete('/user/:id', requireSignin, authMiddleware, remove);
router.get('/user/photo/:id', requireSignin, authMiddleware, photo);


module.exports = router;
