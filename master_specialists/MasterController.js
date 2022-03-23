var express       = require('express'),
    router        = express.Router(),
    bodyParser    = require('body-parser');
 


var Master_specialists = __db.Master_specialists;

router.use(bodyParser.json());


router.post('/new',function (req, res) {  
	var request = req.body;
	Master_specialists.create(request).then(function(Master_specialists){
		res.send("Master_specialists created successfully");
	})
});

router.get('/',function(req,res){
  Master_specialists.findAll().then(function(Master_specialists){
    return res.send(Master_specialists);
  })
});

router.get('/:id',function(req,res){
  Master_specialists.findAll({where: {id: req.params.id}}).then(function(Master_specialists){
    return res.send(Master_specialists);
  })
});

router.put('/deactivate/:id',function (req, res) {  
	var id = req.params.id
	Master_specialists.update({is_active:'0'},{where:{id:id}}).then(function (Master_specialists) {
        if(Master_specialists > 0) {res.send("The masterId: "+id+" is deactivated successfully")}
	})
});

module.exports = router;