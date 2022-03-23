var express       = require('express'),
    router        = express.Router(),
    bodyParser    = require('body-parser')   


var Master_role = __db.Master_role;

router.use(bodyParser.json());

//User register - POST 


router.post('/create',function (req, res) {  
	var request = req.body;	
	Master_role.create(request).then(function(user){
		res.send("Master_role created successfully");	
	})
})

// GET user
router.get('/',function (req, res) { 
  var request = req.body;	 
  Master_role.findAll().then(function(master_role){
    res.send(master_role);  
  })
})
// GET user by id 
  router.get('/:id',function(req,res){
    Master_role.findAll({where: {id: req.params.id}}).then(function(master_role){
      return res.send(master_role);
    })
  }); 

module.exports = router;