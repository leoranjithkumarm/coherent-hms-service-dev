global.Sequelize = require('sequelize');


    //Connnecting to database
const sequelize = new Sequelize({
        username : 'remote',
        password : 'coherent@123',
        database : 'coherent_hms_dev',
        host: '95.217.209.135',
        dialect: 'mysql',
        logging: false
    })
    //DB connectivity check
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


var master_specialists = sequelize.define("master_specialists", 
    {
        speciallation_name: { type: Sequelize.STRING, allowNull: false },
        speciallation_code: { type: Sequelize.STRING, allowNull: false },
        speciallation_type: { type: Sequelize.STRING, allowNull: false },
        is_active:          { type: Sequelize.TINYINT, default : true,allowNull: true },
        deleted_flag:       { type: Sequelize.TINYINT, default : true,allowNull: true },
        createdby:          { type: Sequelize.SMALLINT, allowNull: false },
        updatedby:          { type: Sequelize.SMALLINT, allowNull: true}
    });

var users = sequelize.define("users", 
    {
        user_name:          { type: Sequelize.STRING, allowNull: false },
        password:           { type: Sequelize.STRING, allowNull: false },
        full_name:          { type: Sequelize.STRING, allowNull: false },
        email_id:           { type: Sequelize.STRING, allowNull: false },
        user_random_number: { type: Sequelize.STRING, allowNull: false },
        mobile_number:      { type: Sequelize.STRING, allowNull: false },
        gender:             { type: Sequelize.STRING, allowNull: false },
        education:          { type: Sequelize.STRING, allowNull: true },
        experience:         { type: Sequelize.STRING, allowNull: true },
        is_doctor:          { type: Sequelize.TINYINT, allowNull: true },
        is_active:          { type: Sequelize.TINYINT, default : true,allowNull: true },
        deleted_flag:       { type: Sequelize.TINYINT, default : true,allowNull: true },
        createdby:          { type: Sequelize.SMALLINT, allowNull: false },
        updatedby:          { type: Sequelize.SMALLINT, allowNull: true}
    });


var doctor_specialist_mapping = sequelize.define("doctor_specialist_mapping", 
    {
        user_id_fk:         { type: Sequelize.SMALLINT, allowNull: false },
        specialist_id_fk:   { type: Sequelize.SMALLINT, allowNull: false },
        is_active:          { type: Sequelize.TINYINT, default : true,allowNull: true },
        deleted_flag:       { type: Sequelize.TINYINT, default : true,allowNull: true },
        createdby:          { type: Sequelize.SMALLINT, allowNull: false },
        updatedby:          { type: Sequelize.SMALLINT, allowNull: true}
    });

sequelize.sync();

//Export initialised models
module.exports = {
    Master_specialists : master_specialists,
    Users : users,
    Doctor_specialist_mapping : doctor_specialist_mapping
};
