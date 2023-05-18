const Video = require('../models/Video');
const fs = require('fs');
const path = require('path')
const sequelize = require('sequelize');
const {} = require('sequelize');

exports.getVideos = async(req,res,next)=>{
    let videos;
    const {query,limit,offset,category} = req.query;
        if(query){
            videos = await Video.findAll({
                limit:10,
                where:{
                    description:sequelize.where(sequelize.fn('LOWER', sequelize.col('description')), 'LIKE', '%' + query.toLowerCase() + '%'),                
                }
            })

            res.json(videos).status(200)
        }

        else if(category){
            videos = await Video.findAll({
                limit:10,
                where:{
                    category:category,                
                }
            })

            res.json(videos).status(200)
        }
        else{
            videos = await Video.findAll({limit:parseInt(limit)||10, offset:parseInt(offset)||0});
            res.json(videos).status(200)
        }
}

exports.getRecommended = async(req,res,next)=>{
    let videos;

    try{
        videos = await Video.findAll({limit:5,where:{category:req.params.id}})
        res.json(videos).status(200)
    }
    catch(err){
        res.json({err}).status(404)
    }
}


exports.createVideo = async (req,res,next)=>{
    try{
        const video = await Video.create(req.body);
        res.json(video);
    } 
    catch(error){
        res.json(error)
    }
}

exports.getVideo= async (req,res,next) =>{
    try{
        const video = await Video.findByPk(parseInt(req.params.id));
        const views = video.views + 1;
        await Video.update({views:views},{where:{id:req.params.id}})
        res.json(video);
    }
    catch(error){
        res.json(error);
    }
}

exports.updateVideo = async (req,res,next) =>{
    try{
        const video = await Video.update(req.body,{where:{id:req.params.id}})
        res.json({msg:"Successfully Updated"})
    }
    catch(error){
        res.json(error);
    }

}

exports.deleteVideo= async (req,res,next)=>{
    console.log(__basedir,req)
    try{
        const video = await Video.findByPk(parseInt(req.params.id)); 
        await fs.unlink(path.join(__basedir ,video.url),(err)=>{if(err){throw err} console.log('deleted')});
        await fs.unlink(path.join(__basedir ,video.thumbnail),(err)=>{if(err){throw err} console.log('deleted')});

        await Video.destroy({where:{id:parseInt(req.params.id)}});
        res.json({msg:"Successfully Deleted"})
    }
    catch(error){
        res.json(error);
    }
}