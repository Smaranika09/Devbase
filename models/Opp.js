const mongoose = require("mongoose");

const stageSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},

	completed: {
		type: Boolean,
		default: false
	}
});

const oppSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},

	company: {
		type: String,
		required: true
	}, 

	role: {
		type: String,
		required: true
	},

	type: {
		type: String,
		enum: ["Internship","Job","Hackathon","Fellowship","Competition"],
		required: true
	},

	priority: {
		type: String,
		enum: ["High","Medium","Low"],
		default: "Medium"
	},

	deadline: {
		type: Date,
		required: true
	},

	resumeUsed: {
		type: String,
		trim: true,
		default: ""
	},

	notes: {
		type: String,
		default: ""
	},

	stages: [stageSchema],
	bookmarked: {
		type: Boolean,
		default: false
	},

	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Opp",oppSchema);