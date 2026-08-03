const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},

	title: {
		type: String,
		required: true
	},

	category: {
		type: String,
		enum: ["Project", "Startup", "Hackathon", "Business","Research"],
		required: true
	},

	difficulty:{
		type: String,
		enum: ["Beginner", "Intermediate", "Advanced"],
		required: true
	},

	description: {
		type: String,
		required: true
	},

	tags: [
		String
	],

	pinned:{
		type:Boolean,
		default:false
	},

	createdAt:{
		type:Date,
		default:Date.now
	}

});

module.exports = mongoose.model("Idea",ideaSchema);