const User = require("../models/User");

exports.isLoggedIn = (req,res,next)=>{
	if(req.session.userId){
		return next(); 
	}
	res.redirect("/login");
};

exports.profileCompleted = async(req,res,next)=>{
	const user = await User.findById(req.session.userId);
	if(!user.isProfileComplete){
		return res.redirect("/profile-setup");
	}
	next();
};