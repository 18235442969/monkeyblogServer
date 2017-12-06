/*
 * @Author: hzy 
 * @Date: 2017-12-06 14:44:27 
 * @Last Modified by: hzy
 * @Last Modified time: 2017-12-06 17:27:14
 */
import path from 'path'
import { config } from '../config.js'
import { upload } from '../util/upload.js'
import Tag from '../model/tag.js'
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
    	json.msg = "添加失败";
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
    	json.msg = "获取标签失败";
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
		console.log(json);
		json._msg = "删除失败";
	}
    ctx.body = json;
}