import path from 'path'
import { config } from '../config.js'
import { upload } from '../util/upload.js'
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