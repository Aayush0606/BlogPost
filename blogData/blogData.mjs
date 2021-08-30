import fs from 'fs'
import { title } from 'process'
import { blogs } from '../routes/routes.mjs'
import  mongoose  from 'mongoose'
import {blogSchemaModel} from '../article/mongoBlog.mjs'


mongoose.connect('mongodb://localhost/myBlogsData')



export const blogData={
    get:async function(req,res){
        const blogs=getBlogData()
        return blogs
    },
    add:async function(data){
        const blogs=getBlogData()
        blogs.push(data)
        setBlogData(blogs)
    },
    read:async function(req){
        const title=req.params.id
        const allBlogs=getBlogData()
        const blog=allBlogs.filter(blog => blog.title==title)
        return blog
    },
    delete:async function(req){
        const title=req.params.id
        const allBlogs=getBlogData()
        const blogs=allBlogs.filter(blog=>blog.title!=title)
        setBlogData(blogs)
    },
    checkPrevious: function (data){
        const blogs=getBlogData()
        const prevData=blogs.find(blog=>blog.title==data)
        if(prevData){
            return false
        }
        return true
        },
    update:async function(data){
            const blogs=getBlogData()
            const fliteredBlog=blogs.filter(blog=>blog.title!=data)
            setBlogData(fliteredBlog)
        },
    addToMongo:async function(data){
        var newBlogData=new blogSchemaModel({
            title:data.title,
            description:data.description,
            markdown:data.markdown
        })
        newBlogData= await newBlogData.save()
        return newBlogData.id
    },
    readFromMongo:async function(req,res){
        const  prevBlogs=await blogSchemaModel.find().sort({date:'desc'})
        return prevBlogs
    },
    readSpecificFromMongo:async function(id){
        const  blogToRead=await blogSchemaModel.findById(id)
        return blogToRead
    },
    deleteFromMongo:async function (id){
        await blogSchemaModel.findByIdAndDelete(id)
    }
}



const getBlogData = () => {

    const jsonData = fs.readFileSync('blogs.json')
    return JSON.parse(jsonData)
}

const setBlogData = (data) => {
    const newData = JSON.stringify(data)
    fs.writeFileSync('blogs.json', newData)
}
