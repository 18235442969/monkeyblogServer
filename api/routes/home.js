import * as homeController from '../../controller/homeController.js'

export default async (router) => {
	router.get('/login', homeController.getHomeData)
	router.get('/insertUser', homeController.initUser)
}