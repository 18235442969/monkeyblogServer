import JsonModel from '../core/model/jsonModel';
import User from '../model/user.js'
import toMd5 from '../util/md5'
export async function initUser(ctx) {
	let user = await User.find().exec().catch(err => {
      console.log(err);
    })
  	if (user.length === 0) {
	    // 目前还没做修改密码的功能，因为是单用户系统觉得需求不大
	    // 如果想更换用户名／密码，先将数据库原有user删除(drop)
	    // 配置中加入用户名密码，重启服务即可
	    user = new User({
			name: "hzy",
			username: "casablanca",
			password: toMd5('hzy285878'),
			avatar: "",
			createTime: new Date()
		});
	    await user.save().catch(err => {
	      console.log(err);
	    });
  	}
}

export async function getHomeData(ctx){
	var json = new JsonModel();
	let username = ctx.request.body.username
	let password = ctx.request.body.password

	let user = await User.findOne({
		username
	}).exec()
	if (user != null) {
		if (user.password === toMd5(password)) {
			json.data = user;
		} else {
			json._msg = "密码错误";
		}
	} else {
		json._msg = "查无此人";
	}
	ctx.body = json;
	
}