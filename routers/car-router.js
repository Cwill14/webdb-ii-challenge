const express = require('express');
const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(err => {
            res.status(500).json({ error: "problem getting cars" })
        })
});

router.post('/', (req, res) => {
    const post = req.body;
    db('cars').insert(post)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json({ error: "problem posting car" })
        })
})
module.exports = router;