var mongoose = require('mongoose')

//连接
var db = require('./db')
    // mongoose.connect('mongodb://localhost/blog', { useMongoClient: true })

var Schema = mongoose.Schema
    //设计模型
var commentSchema = new Schema({
    articleId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        //这里不能写Date.now()，因为会即刻调用,
        // 这里给了一个方法Date.now
        // 当new model的时候，如果没有传递created_time属性，mongoose就会调用该方法
        default: Date.now
    }
})


//建模

module.exports = mongoose.model('comment', commentSchema)