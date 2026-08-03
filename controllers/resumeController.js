const Resume = require("../models/Resume");
const fs = require("fs");


exports.resumePage = async (req, res) => {
	try {
		const search = req.query.search || "";
		const resumes = await Resume.find({
			user: req.session.userId,
			$or: [
				{resumeName: {$regex: search, $options: "i"}},
				{targetRole: {$regex: search, $options: "i"}},
				{notes: {$regex: search, $options: "i"} }
			]
		}).sort({
			isLatest: -1,
			createdAt: -1
		});

		const totalResumes = await Resume.countDocuments({
			user: req.session.userId
		});

		const latestResume = await Resume.findOne({
			user: req.session.userId,
			isLatest: true
		});

		const recentUpload = await Resume.findOne({
			user: req.session.userId
		}).sort({
			createdAt: -1
		});

		res.render("resumes", {
			resumes,
			search,
			totalResumes,
			latestResume,
			recentUpload
		});

	} 
	catch (err) {
		console.log(err);
		res.send("Unable to load Resume Vault.");
	}
};


exports.createResume = async (req, res) => {
	try {
		const {resumeName, targetRole, notes} = req.body;
		await Resume.updateMany(
			{
				user: req.session.userId,
				isLatest: true
			},
			{
				isLatest: false
			}
		);
		await Resume.create({
			user: req.session.userId,
			resumeName,
			targetRole,
			notes,
			resumeFile: req.file.filename,
			isLatest: true
		});

		res.redirect("/resumes");

	} 
	catch (err) {
		console.log(err);
		res.send("Unable to upload resume.");
	}
};


exports.deleteResume = async (req, res) => {
	try {
		const resume = await Resume.findById(req.params.id);
		if (!resume) {
			return res.redirect("/resumes");
		}
		fs.unlink(
			"uploads/resumes/" + resume.resumeFile,
			(err) => {
				if (err) {
					console.log(err);
				}
			}
		);

		await Resume.findByIdAndDelete(req.params.id);

		if (resume.isLatest) {
			const newestResume = await Resume.findOne({
				user: req.session.userId
			}).sort({
				createdAt: -1
			});

			if (newestResume) {
				newestResume.isLatest = true;
				await newestResume.save();
			}
		}
		res.redirect("/resumes");
	} 
	catch (err) {
		console.log(err);
		res.send("Unable to delete resume.");
	}
};