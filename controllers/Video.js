const Video = require('../models/Video');
const fs = require('fs');
const path = require('path')

exports.getVideos = async(req,res,next)=>{
        const videos = await Video.findAll();
        res.json(videos)
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
    console.log(req.params)
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