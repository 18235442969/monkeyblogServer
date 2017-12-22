import article from '../api/routes/article';
/*
 * @Author: hzy 
 * @Date: 2017-12-06 14:44:27 
 * @Last Modified by: hzy
 * @Last Modified time: 2017-12-20 09:58:57
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
		articleCount: 0,  
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
		for (let e of tagList) {
			e.articleCount = await Article.count({
				tagId: e._id
			}).catch(err => console.log(err));
		}
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
 * [editArticle 修改文章]
 */
export async function editArticle(ctx) {
	let json = new JsonModel();
	const req = ctx.request.body;
	const editArticle = await Article.updateOne({
		_id: req.id
	},{
		title: req.title,
		tagId: req.tagId,
		tagName: req.tagName,
		content: req.content,
		state: req.state
	}).catch(err => {
		console.log(err);
	});
	if (!editArticle) {
		json._msg = "保存失败";
	} else {
		const article = await Article.findOne({
			_id: req.id
		}).catch(err => console.log(err));
		json.data = article;
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
	const state = ctx.query.state; 
	
	//筛选条件
	let filterTag = {};
	//文章查询
	let articleWhere = Article.find()
	if (tagId != 0) {
		filterTag.tagId = tagId;
		articleWhere = articleWhere.where('tagId').in([tagId])
	}
	if(state){
		articleWhere = articleWhere.where('state').in([state]);
	}
	try {
		//总条数
		const count = await Article.count(filterTag).catch(err => console.log(err));
		//文章列表
		const articleList = await articleWhere.limit(10).skip((page - 1) * 10).sort({
			createTime: -1
		}).exec().catch(err => console.log(err));
		json.data = {
			count: count,
			articleList: articleList
		}
	} catch (err) {
		json._msg = "获取失败";
	}
	ctx.body = json;
}

/**
 * [getArticleDetail 获取文章详情]
 */
export async function getArticleDetail(ctx) {
	let json = new JsonModel();
	const article = await Article.findById(ctx.query.id).catch(err => console.log(err))
	if (!article) {
		json._msg = '获取失败';
	} else {
		json.data = article;
	}
	ctx.body = json;
}

/**
 * [delArticle 删除文章]
 */
export async function delArticle(ctx) {
	let json = new JsonModel();
	const article = await Article.remove({
		_id: ctx.query.id
	}).catch(err => console.log(err));

	if (!article) {
    	json._msg = "删除失败";
  	}
	ctx.body = json;
}
