var express = require('express');
var app = express();var cors = require("cors");
var cors = require("cors");
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

  app.use(cors(corsOpts));
// Declaring global values to handle file and DB module
global.__root   = __dirname + '/';
global.__db   = require(__dirname + '/db.js');

// Master Management Controller API base
var MasterManagementController = require(__root + 'master_specialists/MasterController.js');
app.use('/api/master', MasterManagementController);

// users Management Controller API base
var UserManagementController = require(__root + 'users/UserController.js');
app.use('/api/users', UserManagementController);

// Admin Controller API base
var AdminController = require(__root + 'admin/AdminController.js');
app.use('/api/admin', AdminController);


module.exports = app;