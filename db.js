const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('primetube','root','',{'dialect':'mysql','host':'localhost'});

exports.connectDB= async()=>{
    try{
        await sequelize.authenticate();
        console.log(`DB connection Established`.green.bold)
    }
    catch(error){
        console.error(error);
    }
}
