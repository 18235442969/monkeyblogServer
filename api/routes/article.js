import * as newsController from '../../controller/articleController.js'

export default async (router) => {
	router.post('/upload', newsController.uploadImg),
	router.get('/article/addTag', newsController.addTag),
	router.get('/article/getTags', newsController.getTags),
	router.post('/article/delTag', newsController.delTag)
}