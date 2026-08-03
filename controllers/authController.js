const User = require("../models/User");
const bcrypt = require("bcrypt");


exports.signupPage = (req,res)=>{
	res.render("signup", {
			error: null
		}
	);
};


exports.signup = async (req,res)=>{
	try{
		const {name, email, password, confirmPassword} = req.body;
		if(password !== confirmPassword){
			return res.render("signup", {
				error: "Passwords do not match"
			});
		}
		const existingUser = await User.findOne({email});
		if(existingUser){
			return res.render("signup", {
				error: "Email already exists."
			});
		}
		const hashedPassword = await bcrypt.hash(password,10);
		const newUser = new User({
			name,
			email,
			password: hashedPassword
		});
		await newUser.save();
		res.redirect("/login");
	}
	catch(err){
		console.log(err);
		res.send("Something went wrong");
	}
};


exports.loginPage = (req,res)=>{
	res.render("login", {
		error: null
	});
};


exports.login = async (req,res)=>{
	try{
		const {email, password} = req.body;
		const user = await User.findOne({email});
		if(!user){
			return res.render("login", {
				error: 'Invalid email or password.'
			});
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if(!isMatch){
			return res.render("login", {
				error: 'Invalid email or password.'
			});
		}
		req.session.userId = user._id;
		if(!user.isProfileComplete){
			return res.redirect("/profile-setup");
		}
		res.redirect("/dashboard");
	}
	catch(err){
		console.log(err);
		res.send("Login Failed");
	}
};


exports.logout = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return res.send("Logout failed");
		}
		res.redirect("/login");
	});
};


exports.saveProfile = async (req, res) => {
	try{
		const{name, targetRole, college, graduationYear, bio, github, linkedin, portfolio, skills} = req.body;

		const skillsArray = skills ? skills.split(",").map(skill => skill.trim()).filter(Boolean) : [];

		await User.findByIdAndUpdate(req.session.userId, {
			name, targetRole, college, graduationYear, bio, github, linkedin, portfolio, skills: skillsArray, isProfileComplete: true
		});
		res.redirect("/dashboard");
	}
	catch(err) {
		console.log(err);
		res.send("Profile could not be saved.");
	}
};


exports.profileSetupPage = async (req, res) => {
  try {
		const user = await User.findById(req.session.userId);
		res.render("profile-setup", {
			user
		});
  } 
	catch (err) {
    console.log(err);
    res.send("Unable to load profile.");
  }
};