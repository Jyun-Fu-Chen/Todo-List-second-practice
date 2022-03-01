const express = require('express')
const router = express.Router()
const Todo = require("../../models/todo")



//create todo page
router.get('/new', (req, res) => {
  res.render('new')
})
//create todo data
router.post('/', (req, res) => {
  data = req.body.name
  return Todo.create({ name: data })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//edit todo page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', ({ todo })))
    .catch(error => console.log(error))
})
//edit todo
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})
//todo detail page
router.get('/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', ({ todo })))
    .catch(error => console.log(error))
})
//delete function
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router