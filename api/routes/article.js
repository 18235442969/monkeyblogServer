import * as newsController from '../../controller/articleController.js'
import koaBody from "koa-body";
let body = koaBody({ multipart: true });

export default async (router) => {
	router.post('/upload', newsController.uploadImg),
	router.get('/article/addTag', newsController.addTag),
	router.get('/article/getTags', newsController.getTags),
	router.post('/article/delTag', body, newsController.delTag),
	router.post('/article/addArticle', body, newsController.addArticle),
	router.post('/article/editArticle',body, newsController.editArticle),
	router.get('/article/getArticleList', newsController.getArticleList),
	router.get('/article/delArticle', newsController.delArticle)
}