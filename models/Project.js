const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},

	projectName: {
		type: String,
		required: true
	},

	category: {
		type: String,
		required: true
	},

	githubLink: {
		type: String,
		default: ""
	},

	zipFile: {
		type: String,
		default: ""
	},

	techStack: {
		type: [String],
		required: true
	},

	summary: {
		type: String,
		required: true
	},

	about: {
		type: String,
		required: true
	},

	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Project",projectSchema);