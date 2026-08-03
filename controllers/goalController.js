const Goal = require("../models/Goal");

exports.goalPage = async(req,res)=>{
	try{
		const goals = await Goal.find({
			user: req.session.userId
		});

		const totalGoals = await Goal.countDocuments({
			user: req.session.userId
		});

		const completedGoals = await Goal.countDocuments({
			user: req.session.userId,
			status: "Completed"
		});

		const inProgressGoals = await Goal.countDocuments({
			user: req.session.userId,
			status: "In Progress"
		});

		let completionRate = 0;
		if(totalGoals > 0){
			completionRate = Math.round((completedGoals / totalGoals) * 100);
		}

		res.render("goal-tracker", {
			goals, totalGoals, completedGoals, inProgressGoals, completionRate
		});
	}
	catch(err){
		console.log(err);
		res.send("Unable to load goals.");
	}
};

exports.createGoal = async(req,res)=>{
	try{
		const {title,	description, category, deadline, status,	priority} = req.body;
		await Goal.create({
			user: req.session.userId,
			title,
			description,
			category,
			deadline,
			status,
			priority
		});
		res.redirect("/goals");
	}
	catch(err){
		console.log(err);
		res.send("Unable to create goal.");
	}
};

exports.deleteGoal = async(req,res)=>{
	try{
		await Goal.findOneAndDelete({
			_id: req.params.id,
			user: req.session.userId
		});
		res.redirect("/goals");
	}
	catch(err){
		console.log(err);
		res.send("Unable to delete goal.");
	}
};

exports.updateStatus = async(req,res)=>{
	try{
		await Goal.findOneAndUpdate(
			{
				_id: req.params.id,
				user: req.session.userId
			},
			{
				status: req.body.status
			}
		);
		res.redirect("/goals");
	}
	catch(err){
		console.log(err);
		res.send("Unable to update status.");
	}
};

exports.updatePriority = async(req,res)=>{
	try{
		await Goal.findOneAndUpdate(
			{
				_id: req.params.id,
				user: req.session.userId
			},
			{
				priority: req.body.priority
			}
		);
		res.redirect("/goals");
	}
	catch(err){
		console.log(err);
		res.send("Unable to update priority.");
	}
};

exports.editPage = async(req,res)=>{
	try{
		const opportunity = await Opp.findById(req.params.id);
		res.render("edit-opportunity", {
			opportunity
		});
	}
	catch(err){
		console.log(err);
		res.send("Unable to load opportunity.");
	}
};

exports.updateOpportunity = async(req,res)=>{
	try{
		const{company, role, type, priority,	deadline, resume, notes} = req.body;
		await Opp.findByIdAndUpdate(req.params.id, {
				company,
				role,
				type,
				priority,
				deadline,
				resume,
				notes
		});
		res.redirect("/opportunities");
	}
	catch(err){
		console.log(err);
		res.send("Unable to update opportunity.");
	}
};