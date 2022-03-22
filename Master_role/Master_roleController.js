var express       = require('express'),
    router        = express.Router(),
    bodyParser    = require('body-parser')   


var Master_role = __db.Master_role;

router.use(bodyParser.json());

//User register - POST 

    router.post('/rolecreate',function (req, res) { 
	var request = req.body;
    var role=req.body;
    for(let i=0; i< role.length; i++){
	Master_role.create(role[i])

	}res.send("User created successfully");	
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