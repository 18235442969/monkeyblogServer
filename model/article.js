import mongoose from "mongoose";

const Schema = mongoose.Schema;

const articleSchema = new Schema(
	{
		title: String,
		tagId: String,
		tagName: String,
		authorId: String,
		authorName: String,
		content: String,
		state: Number,
		createTime: String
	},
	{ versionKey: false }
);

module.exports = mongoose.model("article", articleSchema);
