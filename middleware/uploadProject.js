const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
	destination: (req, file, cb)=>{
		cb(null, "uploads/projects");
	},

	filename: (req, file, cb)=>{
		const uniqueFileName = Date.now() + "-" + Math.round(Math.random()*1E9) + path.extname(file.originalname);
		cb(null, uniqueFileName);
	}
});


const fileFilter = (req, file, cb)=>{
	if(!file){
		return cb(null, true);
	}

	const allowedTypes = ["application/zip", "application/x-zip-compressed"];
  
	if(allowedTypes.includes(file.mimetype)){
		cb(null, true);
	}
	else{
		cb(new Error("Only ZIP files are allowed."));
	}
};


const uploadProject = multer({
	storage,
	fileFilter
});

module.exports = uploadProject;