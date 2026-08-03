const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},

	title: {
		type: String,
		required: true
	},

	description: {
		type: String,
		default: ""
	},

	category: {
		type: String,
		default: "General"
	},

	deadline: {
		type: Date
	},

	status: {
		type: String,
		enum: ["Pending", "In Progress", "Completed"],
		default: "Pending"
	},

	priority: {
		type: String,
		enum: ["Low","Medium","High"],
		default: "Low"
	},

	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Goal", goalSchema);