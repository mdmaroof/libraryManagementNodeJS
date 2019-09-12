const express = require('express');
const classes = express.Router();
const conn = require('../config.js');


classes.get('/class', function(req, res) {
    let data = {};
    conn.query("SELECT * FROM `class`", function (error, results, fields) {
        if (error){
            console.log(error)
            res.sendStatus(400);
        } 
        else{
            data['result'] = results;
            res.json(data)
        }
    });
});

module.exports = classes;