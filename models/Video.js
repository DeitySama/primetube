const {Sequelize,DataTypes} = require('sequelize');
const sequelize = new Sequelize('primetube','root','',{'dialect':'mysql','host':'localhost'});

const VideoModel = sequelize.define('Video',{
    id:{
        type:DataTypes.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    url:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    thumbnail:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    views:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

VideoModel.sync();

module.exports = VideoModel;