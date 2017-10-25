import User from '../model/user.js'

export async function initUser(ctx) {
	let user = await User.find().exec().catch(err => {
      console.log(err);
    })
  	if (user.length === 0) {
	    // 目前还没做修改密码的功能，因为是单用户系统觉得需求不大
	    // 如果想更换用户名／密码，先将数据库原有user删除(drop)
	    // 配置中加入用户名密码，重启服务即可
	    user = new User({
	      name: 'hzy',
	      username: 'admin',
	      password: '123456',
	      avatar: '',
	      createTime: new Date()
	    })
	    await user.save().catch(err => {
	      console.log(err);
	    });
  	}
}

export async function getHomeData(ctx){
	let username = ctx.query.username
	let password = ctx.query.password

	let user = await User.findOne({
		username
	}).exec()
	if (user != null) {
		if (user.password === password) {
			ctx.body = {
				status: '01',
				msg: 'success',
				data: user
			}
		} else {
			ctx.body = {
				status: '02',
				msg: '密码错误'
			}
		}
	} else {
		ctx.body = {
			status: '02',
			msg: '查无此人'
		}
	}
}