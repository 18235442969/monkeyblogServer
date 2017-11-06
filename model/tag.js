import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
	value: String,
	createTime: String
},{versionKey: false})

module.exports = mongoose.model('tag', userSchema)