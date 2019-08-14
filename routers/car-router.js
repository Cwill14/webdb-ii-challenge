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
            res.status(201).json({ "new car id": response })
        })
        .catch(err => {
            res.status(500).json({ error: "problem posting car" })
        })
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    db('cars').where('id', '=', id)
        .update(changes)
        .then(count => {
            count > 0 
            ? res.status(200).json({ "cars updated": count })
            : res.status(404).json({ error: "id not found" })
        })
        .catch(err => {
            res.status(500).json({ error: "error updating car" })
        })

});

router.delete('/:id', (req, res) => {
    db('cars').where('id', '=', req.params.id)
        .delete()
            .then(count => {
                count > 0 
                ? res.status(200).json({ "cars deleted": count })
                : res.status(404).json({ error: "id not found" })
            })
            .catch(err => {
                res.status(500).json({ error: "error deleting car" })
            })
})

module.exports = router;