var express       = require('express'),
    router        = express.Router(),
    bodyParser    = require('body-parser');
const merge = require('deepmerge'); 
const Op = Sequelize.Op;



var Users = __db.Users; 
var Master_specialists = __db.Master_specialists;
var Doctor_specialist_mapping  = __db.Doctor_specialist_mapping;
router.post('/login',function(req,res){
  var req_data = req.body;
  var user_name = "coherent@gmail.com";
  var password  = "coherent123";
  if( user_name == req_data.username && password == req_data.password)
  {
    return res.status(200).send("Success");
  }
  else
  {
    return res.status(500).send("Failed");
  }
});

router.use(bodyParser.json());


router.post('/new',function (req, res) 
{  
	var request = req.body;
  var random_number = {
    user_random_number : "USR"+Math.floor(100000 + Math.random() * 900000)
  }
  var user_data_payload = {...request,...random_number};
	Users.create(user_data_payload).then(function(data)
  {
    if (data.is_doctor == '1')
    {
     // console.log(data.id);
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

// router.get('/:id',function(req,res)
// {
//   Users.findOne({where: {id: req.params.id}}).then(function(user_data)
//   {
//     if(user_data.is_doctor == '1')
//     {
//       var new_data =  user_data.dataValues;
//       Doctor_specialist_mapping.findOne({where: {user_id_fk:user_data.id}}).then(function(data)
//       {
//         var mapping_data_id = data.specialist_id_fk;
//         Master_specialists.findOne({where: {id:mapping_data_id}}).then(function(data)
//         {
         
//             var master_data = 
//             {
//               "speciallation_name" : data.speciallation_name
//             }
//           var result = merge(new_data,master_data);
//           return res.send(result);
//         })
//       })
//     }
//     else
//     {
//       return res.send(user_data);
//     }
//   })
// });


router.get('/role/:user_role',function(req,res){
  console.log("tst")
   let is_doctor = req.params.user_role == "doctor" ? 1 : 0 ;
  Users.findAll({where: {is_doctor: is_doctor,is_active:1}}).then(function(Users){
    return res.send(Users);
  })
});


router.get('/',function(req,res){
  Users.findAll().then(function(Users){
    return res.send(Users);
  })
});

//GET put by id

router.put('/update/data/mobile_number/:id',function (req, res) {
  console.log(req.params.id,"Entered")
  Users.update({mobile_number : req.body.mobile_number},{where:{id:req.params.id}}).then(function (user_update) {
        if(user_update > 0) {res.status(200).send("Mobile Number updated successfully")}
  })
});



router.put('/deactivate/:id',function (req, res) {
  Users.update({is_active: '0'},{where:{id:req.params.id}}).then(function (user_update) {
    Doctor_specialist_mapping.update({is_active:'0'},{where: {user_id_fk : req.params.id}}).then(function(map_data){
    })
        if(user_update > 0) {res.status(200).send("The userId: "+req.params.id+" is deactivated successfully")}
  })
});
// router.get('/doctor/list',function(req,res)
// {
//   var final_res_payload = [];
//   var final_data = {}
//   Doctor_specialist_mapping.findAll({raw: true}).then(function(map_data)
//   {
//       for(table of map_data) {
//         console.log("res")
//         final_data = {}
//         // console.log("table",table);
//       Users.findOne({where: {id: table.user_id_fk}}).then(function(user_data){
//           final_data["fullname"] = user_data.full_name;

//           // console.log("user data",user_data);
//         Master_specialists.findOne({where: {id: table.specialist_id_fk}}).then(function(master_data){
//           // console.log("msdata",master_data)
//         //  var final_data =
//         //  {
//         //     "fullname" : user_data.full_name,
//         //     "emailid" :user_data.email_id,
//         //     "mobile_number" : user_data.mobile_number,
//         //     "gender": user_data.gender,
//         //     "education": user_data.education,
//         //     "experience":user_data.experience,
//         //     "speciallation_name" :master_data.speciallation_name
//         //  }
//         final_data["speciallation_name"] = master_data.speciallation_name;
//          final_res_payload.push(final_data);
//          console.log("length of array", final_res_payload.length)
//       })
//       })
//      }
//      console.log("length of array data", final_res_payload.length)
//     res.status(200).send({"response": final_res_payload })

//     })
    
//   })
  router.get('/data/role/specialist',function(req,res){
    var response_array = [];
    Users.findAll({where:{is_doctor:'1',is_active:'1'}}).then(function(user){
        var processItems = function(x){
            if( x < user.length ) {
              Doctor_specialist_mapping.findOne({where:{user_id_fk:user[x].id},attributes:['specialist_id_fk']}).then(function(map_data){
                console.log(map_data.specialist_id_fk)
                Master_specialists.findOne({where:{id:map_data.specialist_id_fk},attributes:['speciallation_name']}) .then(function(res){
                  var data = {
                    "id":user[x].id,
                  //  "user_random_number":user[x].user_random_number,
                    "fullname" : user[x].full_name,
                    "emailid" :user[x].email_id,
                    "mobile_number" : user[x].mobile_number,
                    "gender": user[x].gender,
                    "education": user[x].education,
                    "experience":user[x].experience,
                    "speciallation_name" :res.speciallation_name
                  }
                  response_array.push(data)
                  processItems(x+1);
          })  
              })
          }else {
            res.status(200).send({"data": response_array})
          }
      }
    processItems(0)
    })
  });

  //search 
  router.get('/search',function(req,res){
    var request=req.body;
    var find=req.body.find;  
    //console.log('like')
    Users.findAll({where:{[Op.or]:{user_name: {[Op.like]:'%'+find+'%'},mobile_number: {[Op.like]:'%'+find+'%'}} 
    }}).then(function(Users){      
    return res.send(Users)      
    })  
  })  
    


module.exports = router;