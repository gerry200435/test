var express = require('express');
var router = express.Router();
var sql = require('../conf/db');

/* GET msg list. */
router.get('/', function (req, res, next) {
	res.end('Hello');
});

router.get('/add', function (req, res, next) {
	res.send('Hello add');
});

router.get('/test', function (req, res, next) {
	sql.authenticate()
		.then(function (err) {
			res.send('Connection has been established successfully.');
		})
		.catch(function (err) {
			res.send('err');
			console.log('Unable to connect to the database:', err);
		});
});

module.exports = router;
