import path from 'path'
import { config } from '../config.js'
import { upload } from '../util/upload.js'
import Tag from '../model/tag.js'
/**
 * [uploadImg 上传图片]
 */
export async function uploadImg(ctx){
	let result = {
		status: '01',
		msg: 'success'
	}

	let serverFilePath = path.join(config.root, 'static/image')

	result.imgName = await upload(ctx, {
		fileType: 'album',
		path: serverFilePath
	})

	ctx.body = result
}
/**
 * [addTag 添加标签]
 */
export async function addTag(ctx){
	let result = {
		status: '01',
		msg: 'success'
	}
    let tag = new Tag({
      	value: ctx.query.value,
      	createTime: new Date()
    })
    let tagInfo = await tag.save().catch(err => {
      	console.log(err);
    });
    if ( tagInfo ) {
    	result.data = tagInfo
    	ctx.body = result;
    } else {
    	result.status = "02";
    	result.msg = "fail";
    	ctx.body = result;
    }
}
/**
 * [getTags 获取标签]
 */
export async function getTags(ctx){
	let result = {
		status: '01',
		msg: 'success'
	}
    let tagList = await Tag.find().exec().catch(err => {
      	console.log(err);
    })
    if ( tagList ) {
    	result.data = tagList
    } else {
    	result.status = "02";
    	result.msg = "fail";
    }
	ctx.body = result;
}