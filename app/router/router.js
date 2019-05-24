const express = require('express');
const router = express.Router();
const { index, about, handleRequest, notFound } = require('../controller/indexController');
// const http = require('http').Server(app);
// const io = require('socket.io')(http);

router.get('/', index);
router.post('/detail', handleRequest)


module.exports = router;
