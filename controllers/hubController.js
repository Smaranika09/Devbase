const Hub = require("../models/Hub");

exports.hubPage = async(req,res)=>{
	try{
		const search = req.query.search || "";
		const links = await Hub.find({
			user: req.session.userId,
			$or: [
				{title: {$regex: search, $options: "i"}},
				{username: {$regex: search,$options: "i"}},
        {category: {$regex: search,$options: "i"}}
			]
		}).sort({
			favorite: -1,
			createdAt: -1
		});

		const totalLinks = await Hub.countDocuments({
			user: req.session.userId
		});

		const favoriteLinks = await Hub.countDocuments({
			user: req.session.userId,
			favorite: true
		});

		const recentLinks = await Hub.countDocuments({
			user: req.session.userId,
			createdAt: {
				$gte: new Date(
					Date.now()-7*24*60*60*1000
				)
			}
		});

		const categories = await Hub.distinct("category",
			{
				user: req.session.userId
			}
		);

		res.render("hub",{
			links,
			search,
			totalLinks,
			favoriteLinks,
			recentLinks,
			categories: categories.length
		});
	}
	catch(err){
		console.log(err);
		res.send("Unable to load Developer Hub.");
	}
};


exports.createLink = async(req,res)=>{
	try{
		const{title, url, username,	category} = req.body;
		await Hub.create({
			user:req.session.userId,
			title,
			url,
			username,
			category
		});
		res.redirect("/hub");
	}
	catch(err){
		console.log(err);
		res.send("Unable to add link.");
	}
};


exports.deleteLink = async(req,res)=>{
	try{
		await Hub.findOneAndDelete({
			_id: req.params.id,
			user: req.session.userId
		});
		res.redirect("/hub");
	}
	catch(err){
		console.log(err);
		res.send("Unable to delete link.");
	}
};


exports.toggleFavorite = async(req,res)=>{
	try{
		const link = await Hub.findOne({
			_id: req.params.id,
			user: req.session.userId
		});
		link.favorite = !link.favorite;
		await link.save();
		res.redirect("/hub");
	}
	catch(err){
		console.log(err);
		res.send("Unable to update favorite.");
	}
};