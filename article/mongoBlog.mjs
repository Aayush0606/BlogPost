import mongoose from 'mongoose'

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    markdown:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})


export const blogSchemaModel=mongoose.model('blogSchemaModel',blogSchema)

