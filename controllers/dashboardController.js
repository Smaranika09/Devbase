const Goal = require("../models/Goal");
const Opp = require("../models/Opp");
const Project = require("../models/Project");
const Resume = require("../models/Resume");
const Idea = require("../models/Idea");
const Journal = require("../models/Journal");
const Hub = require("../models/Hub");
const User = require("../models/User");

exports.dashboardPage = async(req,res)=>{
	try{
		const totalGoals = await Goal.countDocuments({
			user: req.session.userId
		});

		const totalOpportunities = await Opp.countDocuments({
			user: req.session.userId
		});

		const totalProjects = await Project.countDocuments({
			user: req.session.userId
		});

		const totalResumes = await Resume.countDocuments({
			user: req.session.userId
		});

		const totalIdeas = await Idea.countDocuments({
			user: req.session.userId
		});

		const totalJournals = await Journal.countDocuments({
			user: req.session.userId
		});

		const totalLinks = await Hub.countDocuments({
			user: req.session.userId
		});

		const user = await User.findById(req.session.userId);

		res.render("dashboard",{
			user,
			totalGoals,
			totalOpportunities,
			totalProjects,
			totalResumes,
			totalIdeas,
			totalJournals,
			totalLinks
		});
	}
	catch(err){
		console.log(err);
		res.send("Unable to load dashboard.");
	}
};