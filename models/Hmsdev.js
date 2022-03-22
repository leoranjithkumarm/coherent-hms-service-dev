
// var master_specialists = sequelize.define("master_specialists", 
//     {
//         speciallation_name: { type: Sequelize.STRING, allowNull: false },
//         speciallation_code: { type: Sequelize.STRING, allowNull: false },
//         speciallation_type: { type: Sequelize.STRING, allowNull: false },
//         is_active:          { type: Sequelize.TINYINT, allowNull: true },
//         deleted_flag:       { type: Sequelize.TINYINT, allowNull: true },
//         createdby:          { type: Sequelize.SMALLINT, allowNull: false },
//         updatedby:          { type: Sequelize.SMALLINT, allowNull: true}
//     });

// var users = sequelize.define("users", 
//     {
//         user_name:          { type: Sequelize.STRING, allowNull: false },
//         password:           { type: Sequelize.STRING, allowNull: false },
//         full_name:          { type: Sequelize.STRING, allowNull: false },
//         email_id:           { type: Sequelize.STRING, allowNull: false },
//         user_random_number: { type: Sequelize.STRING, allowNull: false },
//         mobile_number:      { type: Sequelize.STRING, allowNull: false },
//         is_active:          { type: Sequelize.TINYINT, allowNull: true },
//         deleted_flag:       { type: Sequelize.TINYINT, allowNull: true },
//         createdby:          { type: Sequelize.SMALLINT, allowNull: false },
//         updatedby:          { type: Sequelize.SMALLINT, allowNull: true}
//     });
    
// var Master_role = sequelize.define('master_role', {

//      role_name         :{type:Sequelize.STRING,allowNull:false},
//      role_code         :{type:Sequelize.STRING,allowNull:false},
//      role_desc         :{type:Sequelize.STRING,allowNull:false},
//      is_active         :{type: Sequelize.TINYINT, allowNull: true },
//         deleted_flag   :{type: Sequelize.TINYINT, allowNull: true },
//         createdby      :{type: Sequelize.SMALLINT, allowNull: false },
//         updatedby      :{type: Sequelize.SMALLINT, allowNull: true}
//  });

// sequelize.sync();

// // //Export initialised models
// module.exports = {
//     Master_specialists : master_specialists,
//     Users : users,
//     Master_role: Master_role
// };

