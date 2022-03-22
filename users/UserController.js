var express       = require('express'),
    router        = express.Router(),
    bodyParser    = require('body-parser');
 


var Users = __db.Users;

router.use(bodyParser.json());


router.post('/multiple',function (req, res) {
  var request = req.body;
  var user= req.body
  for( let i=0; i < user.length; i++){
    
    Users.create(user[i])	
    
  } res.send("User created successfully")  
   
  });

router.get('/',function(req,res){
  Users.findAll().then(function(Users){
    return res.send(Users);
  })
});

router.get('/:id',function(req,res){
  Users.findAll({where: {id: req.params.id}}).then(function(Users){
    return res.send(Users);
  })
});

router.get('/mobile_number/:mobile_number',function (req, res) {  
	Users.findAll({where:{mobile_number:req.params.mobile_number}}).then(function (Users) {
    return res.send(Users);
	})
});



module.exports = router;