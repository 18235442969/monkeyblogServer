import Koa from 'koa'
import Router from 'koa-router'
import koaStatic from 'koa-static'
import koaCors from 'koa-cors'
import mongoose from 'mongoose'
import path from 'path'
import { config } from './config.js'
import api from './api'

mongoose.Promise = Promise
mongoose.connect(config.mongodb, config.mongodbSecret)
const db = mongoose.connection
db.on('error', console.error);
db.once('open', function() {
    console.log('连接成功');
})

const app = new Koa();

app.use(koaCors())
const staticPath = './static'
app.use(koaStatic(
	path.join(__dirname, staticPath)
))

app.use(api())

app.listen(config.port, () => {
	console.log(`server starting in ${config.port}`);
})