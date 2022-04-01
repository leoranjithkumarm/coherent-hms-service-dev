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


    var Patient_personal_details = sequelize.define("Patient_personal_details", 
    {
        first_name:{type:Sequelize.STRING, allowNull: false },
        last_name:{type:Sequelize.STRING, allowNull: false },
        age:{type:Sequelize.STRING, allowNull: false },              
        mobile_number:{type:Sequelize.STRING, allowNull: false },
        email:{type:Sequelize.STRING, allowNull: false },
        gender:{type:Sequelize.STRING, allowNull: false },         
        is_active:{ type: Sequelize.TINYINT, default : true,allowNull: true },
        deleted_flag:{type: Sequelize.TINYINT, default : true,allowNull: true },      
        createdby:{type:Sequelize.SMALLINT, default : 200,allowNull: true },
        updatedby:{type:Sequelize.SMALLINT, default : 200,allowNull: true}
    });

    
    var Patient_medical_history = sequelize.define("Patient_medical_history", 
    {
        patient_id_fk:{type:Sequelize.STRING, allowNull: false }, 
        height:{type:Sequelize.STRING, allowNull: false },
        weight:{type:Sequelize.STRING, allowNull: false },
        sugar_level:{type:Sequelize.STRING, allowNull: false },
        bp_level:{type:Sequelize.STRING, allowNull: false },       
        heamoglobin_level:{type:Sequelize.STRING, allowNull: false },             
        is_active:{ type: Sequelize.TINYINT, default : true,allowNull: true },
        deleted_flag:{type: Sequelize.TINYINT, default : true,allowNull: true },      
        createdby:{type:Sequelize.SMALLINT, default : 200,allowNull: true },
        updatedby:{type:Sequelize.SMALLINT, default : 200,allowNull: true}
    });


    var Patient_address_details = sequelize.define("Patient_address_details", 
    {
        patient_id_fk:{type:Sequelize.STRING, allowNull: false },
        door_no:{type:Sequelize.STRING, allowNull: false },
        street_name:{type:Sequelize.STRING, allowNull: false },
        city_name:{type:Sequelize.STRING, allowNull: false },
        state_name:{type:Sequelize.STRING, allowNull: false },       
        landmark:{type:Sequelize.STRING, allowNull: false },
        description:{type:Sequelize.STRING, allowNull: false },              
        is_active:{ type: Sequelize.TINYINT, default : true,allowNull: true },
        deleted_flag:{type: Sequelize.TINYINT, default : true,allowNull: true },      
        createdby:{type:Sequelize.SMALLINT, default : 200,allowNull: true },
        updatedby:{type:Sequelize.SMALLINT, default : 200,allowNull: true}
    });

    
var Doctor_mapping = sequelize.define("Doctor_mapping", 
{
    user_id_fk:         { type: Sequelize.SMALLINT, allowNull: false },
    patient_id_fk:   { type: Sequelize.SMALLINT, allowNull: false },
    is_active:          { type: Sequelize.TINYINT, default : true,allowNull: true },
    deleted_flag:       { type: Sequelize.TINYINT, default : true,allowNull: true },
    createdby:          { type: Sequelize.SMALLINT, allowNull: true },
    updatedby:          { type: Sequelize.SMALLINT, allowNull: true}
});

sequelize.sync();

//Export initialised models
module.exports = {
    Master_specialists : master_specialists,
    Users : users,
    Doctor_specialist_mapping : doctor_specialist_mapping,
    Patient_personal_details:Patient_personal_details,
    Patient_medical_history:Patient_medical_history,
    Patient_address_details:Patient_address_details,
    Doctor_mapping:Doctor_mapping
};
