import path from 'path'
import os from 'os'
import fs from 'fs'
import Busboy from 'busboy'


/**
 * [mkdirsSync 获取存放目录]
 */
function mkdirsSync(filePath){
	if (fs.existsSync(filePath)) {
		return true
	} else {
		if (mkdirsSync(path.dirname(filePath))) {
			fs.mkdirSync(filePath)
			return true
		}
	}
}

/**
 * [getSuffixName 获取文件名称]
 */
function getSuffixName(fileName){
	let fileNameList = fileName.split('.')
	return fileNameList[fileNameList.length - 1]
}


/**
 * [upload 上传]
 */
function upload(ctx, option){
	let req = ctx.req;
	let busboy = new Busboy({
		headers: req.headers
	})
	//获取类型
	let fileType = option.fileType || 'album'
	let filePath = path.join(option.path, fileType)
	let mkdirResult = mkdirsSync(filePath)

	return new Promise((resolve, reject) => {
		console.log('文件开始上传');
		let imgUrl;

		busboy.on('file', function(fieldname, file, filename, encoding, mimetype){
			let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename);
			let _uploadPath = path.join(filePath, fileName);
			let savePath = path.join(_uploadPath);

			file.pipe(fs.createWriteStream(savePath))

			file.on('end', function(){
				imgUrl = `http://${ctx.host}/image/${fileType}/${fileName}`
				resolve(imgUrl)
			})
		})

		busboy.on('finish', function() {
			console.log('上传结束');
			resolve(imgUrl)
		})

		busboy.on('error', function() {
			console.log('上传失败');
			reject('上传失败')
		})
		req.pipe(busboy)
	})
}

export {
	upload
}