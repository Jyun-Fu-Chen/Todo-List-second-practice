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




app.get('/',(req,res)=>{
  res.send('This is todo_list website')
})

app.listen(port,()=>{
  console.log(`localhost:${port} is running`)
})
