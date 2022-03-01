const express = require('express')

const router = express.Router()

const Todo = require("../../models/todo")

router.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ isDone: 'desc' })
    .then(todos => res.render('home', ({ todos })))
    .catch(error => console.log(error))
})

module.exports = router