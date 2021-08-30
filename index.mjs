import express from 'express'
import fs from 'fs'
import ejs from 'ejs'
import path from 'path'
import { blogs } from './routes/routes.mjs'
import { blogData } from './blogData/blogData.mjs'
const app=express()
const PORT = process.env.PORT || 8000



app.set('view engine','ejs')



app.use(express.urlencoded({extended: true}))


app.get('/',blogs.readFromMongo)
app.get('/new',blogs.new)
app.post('/add',blogs.addToMongo)
app.post('/edit/:id',blogs.updateInMongo)
app.get('/delete/:id',blogs.deleteFromMongo)
app.get('/read/:id',blogs.readSpecificFromMongo)
app.get('/edit/:id',blogs.editFromMongo)

app.listen(PORT,()=>{
    console.log(`Server on http://localhost:8000}`)
})