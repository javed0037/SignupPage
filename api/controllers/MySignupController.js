/**
 * MySignupController
 *
 * @description :: Server-side logic for managing Mysignups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	updateByEmailId : function(req, res){
			let email = req.body.email;

			let condition = {
				Email : email
			};
			let updatedValue = {
				Name : req.body.name,
				Password : req.body.password
			};

			SignUp.update(condition, updatedValue).exec(function(err, updateData){
				if(err){
					return res.json({
						status :400,
						message :'error reccords'
					});
				}

				return res.json({
					status :200,
					message :'Update successfully',
					data : updateData
				});
			});

	},

	getData : function (req,res)
	{
		SignUp.find({}).exec(function (err,data){
							if(err){
								return res.json({
									status :400,
									message :'error reccords'
								});
							}
							if(data){
								return res.json ({
									status :200,
									message: 'the data sucessfully reach',
									data :data
								})
							}
							else {
								return res.json({
									status : 200,
									message : 'plz enter any value'
								})
							}
			});
	},

Register : function(req,res){

	console.log("hi i am inside the register");
	let name = req.body.Name;
	let password = req.body.Password;
	let email = req.body.Email;
	let address = req.body.Address;

		if (name && password && email && address)
		{
					//save into db
					let signupObj = {
						Name : name,
						Password : password,
						Email : email,
						Address : address
					};
					SignUp.create(signupObj).exec(function(err, data){
					if(err){
						return res.json({
							status : 400,
							message	: 'Error while saving in DB',
							data : data
						})
					}
					else
					{
					return res.json({
						status : 200,
						message	: 'You have successfully register with us',
						data : data
					})
				}
			})
		}


			else{
				return res.json({
					status : 400,
					message :'Please Fill all the required fields'
				})
			}
	},

	deleteUserByEmailId : function(req,res){
		console.log('Email'+req.body.email);

		SignUp.remove({Email : req.body.email}).exec(function(err, data){
			if(err){
				return res.json({
					status : 400,
					message : 'Error while deleted'
				});
			}
			else{
				return res.json({
					status : 200,
					message : 'User successfully deleted'
				});
			}
		})
	}
}
