var express = require('express');
var router = express.Router();
var sql = require('../conf/db');
var sequelize = require('sequelize');
var User = require('../common/dbfile')(sql, sequelize);
var Comment = require('../common/comment_test')(sql, sequelize);

/* GET msg list. */
router.get('/', function (req, res, next) {
    res.end('Hello');
});

router.get('/add', function (req, res, next) {
    User.create({
        firstName: 'Gerry',
        lastName: 'Yan'
    }).then(function (user) {
        res.send('Created Success '+user.firstName);
    }).catch(function (error) {
        res.send(error);
    });
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

router.get('/init', function (req, res, next) {
    User.sync().then(function () {
        // Table created
        return User.create({
            firstName: 'John',
            lastName: 'Hancock'
        });
    });
    res.end('OK');
});

router.get('/all', function (req, res, next) {
    User.findAll().then(function (comments) {
        res.send(comments);
    });
});

router.get('/delete', function (req, res, next) {
   User.destroy({
       where:{
           firstName: 'Gerry'
       }
   }).then(function (row) {
       res.send(row+' rows deleted.');
   }).catch(function (error) {
       res.send(error);
   });
});

module.exports = router;
