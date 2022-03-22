var express = require('express');
var app = express();

// Declaring global values to handle file and DB module
global.__root   = __dirname + '/';
global.__db   = require(__dirname + '/db.js');

// Master Management Controller API base
var MasterManagementController = require(__root + 'master_specialists/MasterController.js');
app.use('/api/master', MasterManagementController);

// users Management Controller API base
var UserManagementController = require(__root + 'users/UserController.js');
app.use('/api/users', UserManagementController);

// Master_role Controller API base
var Master_role = require(__root + 'Master_role/Master_roleController.js');
app.use('/api/role', Master_role);


module.exports = app;