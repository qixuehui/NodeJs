var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var router = require('./router')

var app = express()
    //公开资源
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))
    //中间件
app.engine('html', require('express-art-template'))
    //如果想设定views的路径，其实path.join()里面的路径可以直接path.join(__dirname,'views')会自动合成完整路径
app.set('views', path.join(__dirname, './views'))
    // 配置解析表单 POST 请求体插件（注意：一定要在 app.use(router) 之前 ）
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())
    // 在 Express 这个框架中，默认不支持 Session 和 Cookie
    // 但是我们可以使用第三方中间件：express-session 来解决
    // 1. npm install express-session
    // 2. 配置 (一定要在 app.use(router) 之前)
    // 3. 使用
    //    当把这个插件配置好之后，我们就可以通过 req.session 来发访问和设置 Session 成员了
    //    添加 Session 数据：req.session.foo = 'bar'
    //    访问 Session 数据：req.session.foo
app.use(session({
        // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
        // 目的是为了增加安全性，防止客户端恶意伪造
        secret: "manyblog",
        resave: false,
        saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
    }))
    //挂载
    // 没什么没有进行导包却可以在router.js使用session，中间件的功能
app.use(router)
app.listen(8080, function() {
    console.log('running~~~');
})


module.exports = app