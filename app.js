require('./db/mongo')
const userRouter = require('./routes/user')
const indexRouter = require('./routes/index')
const quizRouter = require('./routes/quiz')

const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const flash = require('connect-flash')
const { urlencoded } = require('express')
const { runInNewContext } = require('vm')



const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

const viewsPath = path.join(__dirname, './views')
const partialsPath = path.join(__dirname, './views/partials')

//View Engine
app.use(expressLayouts);
// app.set('view engine', 'ejs')
// app.set('views', viewsPath)

//Static assets
app.use(express.static('public'))

//Cookies
app.use(urlencoded({ extended:false }))
app.use(cookieParser())

//Flash messages
app.use(flash())
app.use(session({
    secret: 'Vid0413',
    saveUninitialized: true,
    resave: true,
    cookie: {maxAge: 6000}
}))

app.use(function(req, res, next){
    res.locals.success_messages = req.flash('success_messages')
    res.locals.error_messages = req.flash('error_messages')
    next()
})

//Routers
app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/quiz', quizRouter)

app.listen( PORT,  ()=>{
    console.log(`Server up and running on PORT: ${PORT}.`)
})