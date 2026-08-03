const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},

	resumeName: {
		type: String,
		required: true,
		trim: true
	},

	targetRole: {
		type: String,
		required: true,
		trim: true
	},

	notes: {
		type: String,
		trim: true
	},

	resumeFile: {
		type: String,
		required: true
	}
},
{
	timestamps: true
});

module.exports = mongoose.model("Resume", resumeSchema);