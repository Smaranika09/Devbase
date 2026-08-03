const Opp = require("../models/Opp");

exports.oppPage = async(req,res)=>{
	try{
		const opportunities = await Opp.find({user: req.session.userId}).sort({deadline: 1});
		res.render("opp-tracker", {
			opportunities
		});
	}
	catch(err){
		console.log(err);
		res.send("Unable to load opportunities.");
	}
};

exports.createOpportunity = async(req,res)=>{
	try{
		const{company, role, type, priority,	deadline,	resumeUsed,	notes} = req.body;
		const opportunity = new Opp({
			user: req.session.userId,
			company,
			role,
			type,
			priority,
			deadline,
			resumeUsed,
			notes,
			stages:[ 
				{
					name:"Applied"
				},

				{
					name:"OA"
				},

				{
					name:"Interview"
				},

				{
					name:"HR"
				},

				{
					name:"Offer"
				}
			]
		});
		await opportunity.save();
		res.redirect("/opportunities");
	}
	catch(err){
		console.log(err);
		res.send("Unable to create opportunity.");
	}
};

exports.deleteOpportunity = async(req,res)=>{
	try{
		await Opp.findByIdAndDelete(req.params.id);
		res.redirect("/opportunities");
	}
	catch(err){
		console.log(err);
		res.send("Unable to delete opportunity.");
	}
};

exports.toggleBookmark = async(req,res)=>{
	try{
		const opportunity = await Opp.findById(req.params.id);
		opportunity.bookmarked = !opportunity.bookmarked;
		await opportunity.save();
		res.redirect("/opportunities");
	}
	catch(err){
		console.log(err);
		res.send("Unable to update bookmark.");
	}
};

exports.toggleStage = async(req,res)=>{
	try{
		const opportunity = await Opp.findById(req.params.id);
		const stage = opportunity.stages[req.params.stageIndex];
		stage.completed = !stage.completed;
		await opportunity.save();
		res.redirect("/opportunities");
	}
	catch(err){
		console.log(err);
		res.send("Unable to update stage.");
	}
};