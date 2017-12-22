import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
	value: String,
	articleCount: Number,
	createTime: String
},{versionKey: false})

module.exports = mongoose.model('tag', userSchema)