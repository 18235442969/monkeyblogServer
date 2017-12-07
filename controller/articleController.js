import article from '../api/routes/article';
/*
 * @Author: hzy 
 * @Date: 2017-12-06 14:44:27 
 * @Last Modified by: hzy
 * @Last Modified time: 2017-12-07 17:36:50
 */
import path from 'path'
import { config } from '../config.js'
import { upload } from '../util/upload.js'
import Tag from "../model/tag.js";
import Article from '../model/article.js'
import JsonModel from '../core/model/jsonModel'

/**
 * [uploadImg 上传图片]
 */
export async function uploadImg(ctx){
	let json = new JsonModel();

	let serverFilePath = path.join(config.root, 'static/image')

	json.data = await upload(ctx, {
		fileType: 'album',
		path: serverFilePath
	})

	ctx.body = json;
}
/**
 * [addTag 添加标签]
 */
export async function addTag(ctx){
	let json = new JsonModel();
    let tag = new Tag({
      	value: ctx.query.value,
      	createTime: new Date()
    })
    let tagInfo = await tag.save().catch(err => {
      	console.log(err);
	});
	
    if ( tagInfo ) {
    	json.data = tagInfo;
    } else {
    	json._msg = "添加失败";
    }
	ctx.body = json;
}
/**
 * [getTags 获取标签]
 */
export async function getTags(ctx){
	let json = new JsonModel();
    let tagList = await Tag.find().exec().catch(err => {
      	console.log(err);
    })
    if ( tagList ) {
    	json.data = tagList;
    } else {
		json._msg = "获取标签失败";
    }
	ctx.body = json;
}

/**
 * [delTag 删除标签]
 */
export async function delTag(ctx){
	let json = new JsonModel();
	const tag = await Tag.remove({
		_id: ctx.request.body.id
	}).catch(err => console.log(err));

	if ( !tag ) {
		json._msg = "删除失败";
	}
    ctx.body = json;
}

/**
 * [addArticle 添加文章]
 */
export async function addArticle(ctx) {
	let json = new JsonModel();
	const req = ctx.request.body;
	let article = new Article({
		title: req.title,
		tagId: req.tagId,
		tagName: req.tagName,
		authorId: req.authorId,
		authorName: req.authorName,
		content: req.content,
		state: req.state,
		createTime: new Date()
	});
	const addArticle = await article.save().catch(err => {
		console.log(err);
	});
	if (!addArticle) {
		json._msg = "保存失败";
	} else {
		json.data = addArticle;
	}
	ctx.body = json;
}

/**
 * [getArticleList 获取文章列表]
 */
export async function getArticleList(ctx) {
	let json = new JsonModel();
	const tagId = ctx.query.tagId;
	const page = ctx.query.page; 
	
	//筛选条件
	const filterTag = {};
	if (tagId === 0) {
	  	filterTag.tagId = tagId;
	}

	try {
		const count = Article.count(filterTag);
		const articleList = Article.find(filterTag).limit(10).skip(page * 10).exec();
		console.log(count);
		console.log(articleList);
	// 	json.data = {
	// 		count: count,
	// 		articleList: articleList
	// 	}
	} catch (err) {
		json._msg = "获取失败";
	}
	// ctx.body = json;
}
