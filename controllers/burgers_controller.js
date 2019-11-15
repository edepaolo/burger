const express = require('express');
const router = express.Router();
const burger = require('../models/burger.js');

router.get('/', function (req, res) {
    burger.selectAll(function(data) {
        let readyToEatBurgers = [];
        let devouredBurgers = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].devoured === 1) {
                devouredBurgers.push(data[i]);
            } else {
                readyToEatBurgers.push(data[i]);
            }
        }
        res.render('index', {readyToEatBurgers: readyToEatBurgers, devouredBurgers: devouredBurgers});
    })
});

router.post('/api/burgers', function (req, res) {
    burger.insertOne([req.body.burger_name], function(data) {
        res.status(204).end();
    });
});

router.put('/api/burgers/:id', function (req, res) {
    let columnValueObject = req.body
    let condition = `id = ${req.params.id}`;
    burger.updateOne(columnValueObject, condition, function(data) {
        if (data.changedRows === 0) {
            return res.status(404).end();
        }
        res.status(204).end();
    });
});

module.exports = router;