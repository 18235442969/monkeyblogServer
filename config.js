const config = {
	port: 9957,
	baseApi: '/api',
	root: __dirname,
	mongodb: 'mongodb://localhost:27017/monkeyBlog',
	mongodbSecret: {
	    useMongoClient:true
  	},
}

export {
	config
}