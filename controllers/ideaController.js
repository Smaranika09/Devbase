const Idea = require("../models/Idea");

exports.ideaPage = async(req,res)=>{
	try{
		const search = req.query.search || "";
		const ideas = await Idea.find({
			user: req.session.userId,
			$or: [
				{title: {$regex: search, $options: "i"}},
				{description: {$regex: search, $options: "i"}},
				{category: {$regex: search, $options: "i"}}
			]
		}).sort({
			pinned:-1,
			createdAt:-1
		});

		const totalIdeas = await Idea.countDocuments({
			user: req.session.userId
		});

		const pinnedIdeas = await Idea.countDocuments({
			user: req.session.userId,
			pinned: true
		});

		const recentIdeas = await Idea.countDocuments({
			user: req.session.userId,
			createdAt: {
				$gte: new Date(Date.now()-7*24*60*60*1000)
			}
		});

		const categories = await Idea.distinct(
			"category",
			{
				user: req.session.userId
			}
		);

		res.render("ideas", {
			ideas,
			search,
			totalIdeas,
			pinnedIdeas,
			recentIdeas,
			categories: categories.length
		});
	}
	catch(err){
		console.log(err);
		res.send("Unable to load ideas.");
	}
};

exports.createIdea = async(req,res)=>{
	try{
		const{title, category, difficulty, description, tags} = req.body;

		await Idea.create({
			user: req.session.userId,
			title,
			category,
			difficulty,
			description,
			tags: tags.split(",").map(tag=>tag.trim()).filter(tag => tag !== "")
		});
		res.redirect("/ideas");
	}
	catch(err){
		console.log(err);
		res.send("Unable to create idea.");
	}
};

exports.deleteIdea = async(req,res)=>{
	try{
		await Idea.findOneAndDelete({
			_id: req.params.id,
			user: req.session.userId
		});
	}
	catch(err){
		console.log(err);
		res.send("Unable to delete idea.");
	}
};

exports.togglePin = async(req,res)=>{
	try {
		const idea = await Idea.findOne({
    	_id: req.params.id,
    	user: req.session.userId
		});
		idea.pinned =! idea.pinned;
		await idea.save();
		res.redirect("/ideas");
	}
	catch(err){
		console.log(err);
		res.send("Unable to update idea.");
	}
};