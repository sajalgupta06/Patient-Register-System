const express = require("express");
const router = express.Router();
const { create,list,info } = require("../controllers/psychiatrist");
const { requireSignin, authMiddleware } = require("../controllers/auth");

router.post('/psychiatrists/create',requireSignin, authMiddleware , create);
router.get('/psychiatrists/list',requireSignin, authMiddleware , list);
router.get('/psychiatrists/info',requireSignin, authMiddleware , info);


module.exports = router;
