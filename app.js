import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import koaStatic from 'koa-static'
import koaCors from 'koa-cors'
import mongoose from 'mongoose'
import path from 'path'
import { config } from './config.js'
import api from './api'
import koaBody from 'koa-body'
let body = koaBody({multipart:true})

mongoose.Promise = Promise
mongoose.connect(config.mongodb, config.mongodbSecret)
const db = mongoose.connection
db.on('error', console.error);
db.once('open', function() {
    console.log('连接成功');
})

const app = new Koa();
//解决跨域
app.use(koaCors())

// 使用ctx.body解析中间件
app.use(body);

const staticPath = './static'
app.use(koaStatic(
	path.join(__dirname, staticPath)
))

app.use(api())

app.listen(config.port, () => {
	console.log(`server starting in ${config.port}`);
})