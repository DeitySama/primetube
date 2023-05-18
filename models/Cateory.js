const {Sequelize,DataTypes} = require('sequelize');
const sequelize = new Sequelize('primetube','root','',{'dialect':'mysql','host':'localhost'});

const CategoryModel = sequelize.define('Category',{
    id:{
        type:DataTypes.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    desc:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
})

CategoryModel.sync()

module.exports = CategoryModel;