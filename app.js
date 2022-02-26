const express = require("express")
const port = 3000
const exphbs = require("express-handlebars")
const app = express()
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
//single todo page
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', ({ todo })))
    .catch(error => console.log(error))
})


//create todo page



//edit todo page

app.listen(port,()=>{
  console.log(`localhost:${port} is running`)
})
