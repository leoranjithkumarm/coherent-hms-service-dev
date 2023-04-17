var express = require('express'),
  router = express.Router(),
  bodyParser = require('body-parser');



var Master_specialists = __db.Master_specialists;

router.use(bodyParser.json());


router.post('/new', function (req, res) {
  var request = req.body;
  Master_specialists.create(request).then(function (Master_specialists) {
    console.log("data", Master_specialists)
    res.status(200).send("Master_specialists created successfully")
    // res.send("");
  })
});

router.get('/', function (req, res) {
  Master_specialists.findAll({ where: { is_active: '1' } }).then(function (Master_specialists) {
    return res.send(Master_specialists);
  })
});

router.get('/:id', function (req, res) {
  Master_specialists.findAll({ where: { id: req.params.id } }).then(function (Master_specialists) {
    return res.send(Master_specialists);
  })
});

router.put('/deactivate/:id', function (req, res) {
  var id = req.params.id
  Master_specialists.update({ is_active: '0' }, { where: { id: id } }).then(function (Master_specialists) {
    if (Master_specialists > 0) { res.send("The masterId: " + id + " is deactivated successfully") }
  })
});

router.put('/update/data/code/:id', function (req, res) {
  console.log(req.params.id, "Updated")
  Master_specialists.update({ speciallation_code: req.body.speciallation_code }, { where: { id: req.params.id } }).then(function (Master_specialists) {
    if (Master_specialists > 0) { res.send("Specilazation Code updated") }
  })
});
module.exports = router