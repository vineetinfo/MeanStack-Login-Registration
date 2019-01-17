var User   = require("../models/user");
var jwt    = require("jsonwebtoken");
var secret = 'vkinfo';

module.exports = function(router){

	//user registration Route

	router.post('/users',function(req,res){
	var user = new User();
	user.username = req.body.username;
	user.email    = req.body.email;
	user.password = req.body.password;

	if(req.body.username == null || req.body.username == '' ||req.body.email == null || req.body.email == '' || req.body.password == null || req.body.password == ''){
		res.json({success:false,message:"Ensure Username  Email And Password Is Provided...!"});
	}
	else{
		user.save(function(err){
			if(err){
				res.json({success:false,message:'Username And Password Is Already Exist...!'});
			}else{
				res.json({success:true,message:'User Created...!'})
			}
		})
	}
})


	//user login Route

	router.post('/authenticate',function(req,res){
		User.findOne({username: req.body.username}).select('email username password').exec(function(err, user){
			if(err) throw err;

			if(!user){
				if(req.body.password){
					res.json({success: false, message: 'Could Not Authenticate User'});
				}
				else{
					res.json({success:false, message:'No Password Provided!'});
				}
				
			}
			else if(user){
				validPassword = user.comparePassword(req.body.password);
				if(!validPassword){
					res.json({success: false, message : 'Could Not Authenticate Password'});
				}
				else{

					var token = jwt.sign({username: user.username, email:user.email}, secret, {expiresIn : '24h'} );
					res.json({success:true, message: 'User Authenticated!', token: token});
				}
			}
		})
	})


	router.use(function(req,res,next){
		var token = req.body.token || req.body.query || req.headers['x-access-token'];

		if(token){
			jwt.verify(token,secret,function(err,decoded){
				if(err){
					res.json({success:false,message: "Invalid Token"});
				}
				else{
					req.decoded =decoded;
					next();
				}
			})
		}
		else{
			res.json({success:false, message: 'No token provided!'});
		}
	})


	router.post('/me',function(req,res){
		res.send(req.decoded);
	})

return router;
}