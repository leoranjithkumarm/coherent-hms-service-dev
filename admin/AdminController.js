var express = require('express'),
	router = express.Router(),
	bodyParser = require('body-parser');

var Users = __db.Users;
var Patient_personal_details = __db.Patient_personal_details;
var Patient_medical_history = __db.Patient_medical_history;
var Patient_address_details = __db.Patient_address_details;
var Doctor_mapping = __db.Doctor_mapping;
router.use(bodyParser.json());
//patient register
router.post('/new', function (req, res) {
	var request = req.body;
	Patient_personal_details.create(request).then(function (patient_data) {
		var patient_payload_1 = {
			patient_id_fk: patient_data.id,
			height: request.height,
			weight: request.weight,
			sugar_level: request.sugar_level,
			bp_level: request.bp_level,
			heamoglobin_level: request.heamoglobin_level,
			createdby: request.createdby,
			updatedby: request.updatedby
		}
		var patient_payload_2 = {
			patient_id_fk: patient_data.id,
			door_no: request.door_no,
			street_name: request.street_name,
			city_name: request.city_name,
			state_name: request.state_name,
			landmark: request.landmark,
			description: request.description,
			createdby: request.createdby,
			updatedby: request.updatedby
		}
		var doctor_payload_3 =
		{
			"user_id_fk": patient_data.id,
			"patient_id_fk": patient_data.id,
			"createdby": request.createdby,
			"updatedby": request.updatedby

		}

		Patient_medical_history.create(patient_payload_1).then(function (medical_history) {
			Patient_address_details.create(patient_payload_2).then(function (address_details) {
				Doctor_mapping.create(doctor_payload_3).then(function (doctor_mapping) {
					res.send("Patient created successfully");
				})
			})
		})
	})
});

//get patient details  
router.get('/patient/list', function (req, res) {
	var response_array = [];
	Patient_personal_details.findAll().then(function (patient_basic) {
		var patient_payload = patient_basic;
		var processItems = function (x) {
			if (x < patient_payload.length) {
				Patient_medical_history.findOne({ where: { patient_id_fk: patient_payload[x].id } }).then(function (patient_data) {
					var data = { ...patient_payload[x].dataValues, ...patient_data.dataValues }
					Patient_address_details.findOne({ where: { patient_id_fk: patient_payload[x].id } }).then(function (patient_medical) {
						var final_data = { ...data, ...patient_medical.dataValues }
						Doctor_mapping.findOne({ where: { patient_id_fk: patient_payload[x].id } }).then(function (doctor_mapping) {

							Users.findOne({ where: { id: doctor_mapping.dataValues.patient_id_fk }, attributes: ['user_name'] }).then(function (user_data) {
								console.log(user_data)
								final_data['doctor_name'] = user_data.user_name
								response_array.push(final_data)
								processItems(x + 1);
							})
						})
					})
				})
			} else {
				res.status(200).send({ "patient_data": response_array })
			}
		}
		processItems(0)
	})
});
//patient deactivate by id
router.put('/patient/deactivate/:id', function (req, res) {
	var id = req.params.id
	Patient_personal_details.update({ is_active: '0' }, { where: { id: id } }).then(function (patient_data) {
		if (patient_data > 0) { res.send("The patient_Id: " + id + " is deactivated successfully") }
	})
});

//get all patient list
router.get('/', function (req, res) {
	Patient_personal_details.findAll().then(function (patient_data) {
		return res.send(patient_data);
	})
});

//get patient list by id 
router.get('/:id', function (req, res) {
	Patient_personal_details.findAll({ where: { id: req.params.id } }).then(function (patient_data) {
		return res.send(patient_data);
	})
});




module.exports = router;