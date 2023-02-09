const {Sequelize,DataTypes} = require('sequelize');
const sequelize = new Sequelize('primetube','root','',{'dialect':'mysql','host':'localhost'});

const UserModel = sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    role:{
        type:DataTypes.ENUM,
        values:['admin','user'],
        defaultValue:'user'
    }
})

UserModel.sync()

module.exports = UserModel;