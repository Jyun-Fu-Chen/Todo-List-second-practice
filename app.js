const express = require("express")
const port = process.env.PORT || 3000
const exphbs = require("express-handlebars")
const methodOverride = require('method-override')
const bodyParser = require('body-parser')


const routes = require('./routes')
require('./config/mongoose')

const app = express()

app.engine("handlebars", exphbs.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(routes)



app.listen(port,()=>{
  console.log(`localhost:${port} is running`)
})


