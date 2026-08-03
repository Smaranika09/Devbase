const Project = require("../models/Project");

exports.projectPage = async(req,res)=>{
	try{
		const search = req.query.search || "";

		const projects = await Project.find({
      user: req.session.userId,
      $or: [
        {projectName: {$regex:search, $options:"i"}},
        {category: {$regex:search, $options:"i"}},
        {techStack: {$regex:search, $options:"i"}}
      ]
    }).sort({
      createdAt: -1
    });

		const totalProjects = projects.length;

		const totalCategories = new Set(projects.map(project=>project.category)).size;

		const githubProjects = projects.filter(project=>project.githubLink).length;

		const zipProjects = projects.filter(project=>project.zipFile).length;

		res.render("projects",{
			projects,
			search,
			totalProjects,
			totalCategories,
			githubProjects,
			zipProjects
		});
	}
	catch(err){
		console.log(err);
		res.send("Unable to load Project Vault.");
	}
};


exports.createProject = async(req,res)=>{
	try{
		const{projectName, category, githubLink, techStack,	summary, about} = req.body;

		if(!req.file && !githubLink.trim()){
			return res.send("Please upload a ZIP file or provide a GitHub repository.");
		}

		const techArray = techStack.split(",").map(tech=>tech.trim()).filter(tech=>tech);

		await Project.create({
			user: req.session.userId,
			projectName,
			category,
			githubLink,
			zipFile: req.file ? req.file.filename : "",
			techStack: techArray,
			summary,
			about: about
		});

		res.redirect("/projects");
	}
	catch(err){
		console.log(err);
		res.send("Unable to create project.");
	}
};


exports.deleteProject = async(req,res)=>{
	try{
		Project.findOneAndDelete({
			_id: req.params.id,
			user: req.session.userId
		});
		res.redirect("/projects");
	}
	catch(err){
		console.log(err);
		res.send("Unable to delete project.");
	}
};