const express = require("express")
const port = 3000
const exphbs = require("express-handlebars")
const app = express()
//use express-handlebars
app.engine("handlebars",exphbs.engine())
app.set('view engine', 'handlebars')
app.set('views','./views')




app.get('/',(req,res)=>{
  res.send('This is todo_list website')
})

app.listen(port,()=>{
  console.log(`localhost:${port} is running`)
})
