require("dotenv").config();

const express = require("express");
const session = require("express-session");
const authMiddleware = require("./middleware/authMiddleware");

const User = require("./models/User");
const Goal = require("./models/Goal");
const Opp = require("./models/Opp");

const authRoutes = require("./routes/authRoutes");
const goalRoutes = require("./routes/goalRoutes");
const oppRoutes = require("./routes/oppRoutes");
const hubRoutes = require("./routes/hubRoutes");
const ideaRoutes = require("./routes/ideaRoutes");
const journalRoutes = require("./routes/journalRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const projectRoutes = require("./routes/projectRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const connectDB = require("./config/db");
const app = express();  


app.set("view engine", "ejs");    
app.use(express.urlencoded({extended: true}));    
app.use(express.json());    
app.use(express.static("public"));    
app.use("/uploads", express.static("uploads"));


app.use(session({
  secret: process.env.SESSION_SECRET,    
  resave: false,   
  saveUninitialized: false   
}));



app.get("/", (req, res) => {
  res.render("landing-page");
});


app.use(authRoutes);
app.use(goalRoutes);
app.use(oppRoutes);
app.use(hubRoutes);
app.use(ideaRoutes);
app.use(journalRoutes);
app.use(resumeRoutes);
app.use(projectRoutes);
app.use(dashboardRoutes);


app.get(
	"/profile-setup", 
	authMiddleware.isLoggedIn, 
	(req,res)=>{
	res.render("profile-setup");
});


app.get(
	"/dashboard",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,

	async(req,res)=>{
		const user = await User.findById(req.session.userId);
		const totalGoals = await Goal.countDocuments({
			user: req.session.userId
		});

		const completedGoals = await Goal.countDocuments({
			user: req.session.userId,
			status: "Completed"
		});

		const inProgressGoals = await Goal.countDocuments({
			user: req.session.userId,
			status:"In Progress"
		});

		res.render("dashboard",{user, totalGoals, completedGoals, inProgressGoals});
	}
);



const PORT = process.env.PORT || 3010;

const startServer = async () => {
	try{
		await connectDB();
		app.listen(PORT, () => {
			console.log(`Server running at http://localhost:${PORT}`);
		});
	}
	catch(err){
		console.log(err);
	}
};
startServer();
// this starts the express & it listens to the requests & sends responses.