const Journal = require("../models/Journal");

exports.journalPage = async(req,res)=>{
	try{
		const search = req.query.search || "";
		const journals = await Journal.find({
			user: req.session.userId,
			$or: [
				{title: {$regex: search, $options: "i"}},
				{content: {$regex: search, $options: "i"}}
			]
		}).sort({
			createdAt: -1
		});

		const totalEntries = await Journal.countDocuments({
			user: req.session.userId
		});

		const thisMonth = await Journal.countDocuments({
			user: req.session.userId,
			createdAt: {
				$gte: new Date(
					new Date().getFullYear(),
					new Date().getMonth(),
					1
				)
			}
		});

		const lastEntry = await Journal.findOne({
			user: req.session.userId
		}).sort({
			createdAt: -1
		});

		res.render("journal",{
			journals,
			search,
			totalEntries,
			thisMonth,
			lastEntry
		});
	}
	catch(err){
		console.log(err);
		res.send("Unable to load journal.");
	}
};

exports.createEntry = async(req,res)=>{
	try{
		const{title, content,	mood} = req.body;
		await Journal.create({
			user: req.session.userId,
			title,
			content,
			mood
		});
		res.redirect("/journal");
	}
	catch(err){
		console.log(err);
		res.send("Unable to save journal.");
	}
};

exports.deleteEntry = async(req,res)=>{
	try{
		await Journal.findOneAndDelete({
			_id: req.params.id,
			user: req.session.userId
		});
		res.redirect("/journal");
	}
	catch(err){
		console.log(err);
		res.send("Unable to delete journal.");
	}
};