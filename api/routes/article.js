import * as newsController from '../../controller/articleController.js'

export default async (router) => {
	router.post('/upload', newsController.uploadImg)
}