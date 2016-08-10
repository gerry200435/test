var express = require('express');
var router = express.Router();

/* GET msg list. */
router.get('/', function(req, res, next) {
	res.end('Hello');
});

module.exports = router;
