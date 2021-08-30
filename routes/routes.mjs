import fs from 'fs'
import { blogData } from '../blogData/blogData.mjs'


export const blogs={
    get:async function(req,res){
        const articles = await blogData.get(req.body)
        res.render('index',{articles:articles})
    },

    new:async function(req,res){
        const article=[{
            title:"",
            description:"",
            markdown:""
        }]
        res.render('new',{article:article})
    },
    add: async function(req,res){
        const params=req.body
        if(blogData.checkPrevious(params.title)){
            blogData.add(params)
            const id=params.title
            res.redirect(`/read/${id}`)
        }
        else{
            res.send('Title Already Exist')
        }
    },
    delete: async function(req,res){
        const article=await blogData.delete(req)
        res.redirect('/')
    },
    read:async function(req,res){
        const article=await blogData.read(req)
        res.render('read',{article:article})
    },
    edit:async function(req,res){
        const article=await blogData.read(req)
        res.render('update',{article:article})
    },
    update:async function(req,res){
        const params=req.body
        blogData.update(req.body.title)
        blogData.add(params)
            const id=params.title
            res.redirect(`/read/${id}`)
    },
    addToMongo:async function(req,res){
        const params=req.body
        const id=await blogData.addToMongo(params)
        res.redirect(`/read/${id}`)
    },
    readFromMongo:async function(req,res){
        const articles=await blogData.readFromMongo()
        res.render('index',{articles:articles})
    },
    readSpecificFromMongo:async function(req,res){
        const article=await blogData.readSpecificFromMongo(req.params.id)
        res.render('read',{article:article})
    },
    deleteFromMongo:async function(req,res){
        blogData.deleteFromMongo(req.params.id)
        res.redirect('/')
    },
    editFromMongo:async function(req,res){
        const article=await blogData.readSpecificFromMongo(req.params.id)
        res.render('update',{article:article})
    },
    updateInMongo:async function(req,res){
        blogData.deleteFromMongo(req.params.id)
        const params=req.body
        const id=await blogData.addToMongo(params)
        res.redirect(`/read/${id}`)
    }
}