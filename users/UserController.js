var express       = require('express'),
    router        = express.Router(),
    bodyParser    = require('body-parser');
const merge = require('deepmerge'); 


var Users = __db.Users; 
var Master_specialists = __db.Master_specialists;
var Doctor_specialist_mapping  = __db.Doctor_specialist_mapping;

router.use(bodyParser.json());

router.post('/new',function (req, res) 
{  
	var request = req.body;
	Users.create(request).then(function(data)
  {
    if (data.is_doctor == '1')
    {
      console.log(data.id);
      var doctor_payload = 
      {
        "user_id_fk" : data.id,
        "specialist_id_fk"   : req.body.specialist_id,
        "createdby" : data.createdby,
        "updatedby" : data.updatedby
      }

        Doctor_specialist_mapping.create(doctor_payload).then(function(data)
        {
          res.send("User_doctor created successfully");
        });
      }
    
    else{
		res.send("User_admin created successfully");
  }
	})
});

router.get('/:id',function(req,res)
{
  Users.findOne({where: {id: req.params.id}}).then(function(user_data)
  {
    if(user_data.is_doctor == '1')
    {
      var new_data =  user_data.dataValues;
      Doctor_specialist_mapping.findOne({where: {user_id_fk:user_data.id}}).then(function(data)
      {
        var mapping_data_id = data.specialist_id_fk;
        Master_specialists.findOne({where: {id:mapping_data_id}}).then(function(data)
        {
         
            var master_data = 
            {
              "speciallation_name" : data.speciallation_name
            }
          var result = merge(new_data,master_data);
          return res.send(result);
        })
      })
    }
    else
    {
      return res.send(user_data);
    }
  })
});


router.get('/role/:user_role',function(req,res){
   let is_doctor = req.params.user_role == "doctor" ? 1 : 0 ;
  Users.findAll({where: {is_doctor: is_doctor}}).then(function(Users){
    return res.send(Users);
  })
});


router.get('/',function(req,res){
  Users.findAll().then(function(Users){
    return res.send(Users);
  })
});


//User deactivation - PUT 
router.put('/deactivate/:id',function (req, res) {  
  Users.update({is_active: '0'},{where:{id:req.params.id}}).then(function (user_update) {
    if(user_update == 0) {res.status(500).send("User deactivation Failed")}
        if(user_update > 0) {res.status(200).send("The userId: "+req.params.id+" is deactivated successfully")}
  })
});


module.exports = router;