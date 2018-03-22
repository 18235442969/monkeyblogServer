import * as homeController from '../../controller/homeController.js'
import koaBody from "koa-body";
let body = koaBody({ multipart: true });

export default async (router) => {
	homeController.initUser()
	router.post('/login', body, homeController.getHomeData)
	router.get('/insertUser', homeController.initUser)
}