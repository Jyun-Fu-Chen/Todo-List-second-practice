const express = require("express")
const port = 3000
const exphbs = require("express-handlebars")
const app = express()
//bodyParer
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
//use express-handlebars
app.engine("handlebars",exphbs.engine())
app.set('view engine', 'handlebars')
app.set('views','./views')
//set mongoose connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo-list')
const db = mongoose.connection
db.on('error',()=>{
  console.log('mongodb error')
})
db.once('open',()=>{
  console.log('mongodb connected');
})
const Todo = require('./models/todo.js')




//main page
app.get('/',(req,res)=>{
  Todo.find()
  .lean()
  .then(todos => res.render('home',({todos})))
  .catch(error => console.log(error))
})

//create todo page
app.get('/todos/new', (req, res) => {
 res.render('new')
})
//create todo data
app.post('/todos',(req,res)=>{
  data = req.body.name
  return Todo.create({name: data})
  .then(()=>res.redirect('/'))
  .catch(error=>console.log(error))
})

//edit todo page

app.listen(port,()=>{
  console.log(`localhost:${port} is running`)
})

//single todo page
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', ({ todo })))
    .catch(error => console.log(error))
})
