const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const handlebars = require('express-handlebars');
const todoRoutes = require('./routes/todo.js');

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
})


app.engine('hbs',hbs.engine)

app.set('view engine','hbs')
app.set('views','views')
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.use(todoRoutes)

async function start() {
    try {
        await mongoose.connect('mongodb+srv://admin:1a2b3c@cluster0.uud24.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useFindAndModify: false
        })

        app.listen(PORT, ()=>{
            console.log("Server has been started...");
        })
    } catch (e){
        console.log(e);
    }
}

start();

