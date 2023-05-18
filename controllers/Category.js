const Category = require('../models/Cateory');

exports.getCategories = async(req,res,next) =>{
    let categories;

    try{
        categories = await Category.findAll();
        res.json({categories}).status(200)
    }
    catch(err){
        res.json({err}).status(404);
    }
}

exports.getCategory = async(req,res,next)=>{
    let category;

    try{
        category = await Category.findByPk(req.params.id);
        res.json({category}).status(200)
    }
    catch(err){
        res.json({err}).status(404)
    }
}

exports.createCategory = async(req,res,next)=>{
    let category;

    try{
        category = await Category.create(req.body);

        res.json({category}).status(201);
    }
    catch(err){
        res.json({err}).status(422)
    }
}

exports.updateCategory = async (req,res,next) =>{
    let category;

    try{
        category = await Category.update(req.body,{where:{id:req.params.id}});
        res.json({category}).status(202)
    }
    catch(err){
        res.json({err}).status(400)
    }
}


exports.deleteCategory = async (req,res,next) =>{
    let category;

    try{
        category = await Category.destroy({id:parseInt(req.params.id)});
        res.json({msg:'Deletion Successful'}).status(200);
    }
    catch(err){
        res.json({err}).status(400)
    }
}