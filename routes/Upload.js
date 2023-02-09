const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const storageVideos = multer.diskStorage({
    destination(req,file,cb){
        cb(null,"uploads/videos")
    },
    filename(req,file,cb){
        cb(null,`${Date.now()}`+ path.extname(file.originalname))
    }
})

const uploadVideos = multer({storage:storageVideos});

const storageThumbnails = multer.diskStorage({
    destination(req,file,cb){
        cb(null,"uploads/thumbnails/")
    },
    filename(req,file,cb){
        cb(null,`${Date.now()}`+ path.extname(file.originalname))
    }
})

const uploadThumbnails = multer({storage:storageThumbnails});


router.post("/v",uploadVideos.single('file'),(req,res)=>{
    console.log(req.file)
        res.json({
            success:true,
            path: `/${req.file.path}`,
        });
})

router.post("/t",uploadThumbnails.single('file'),(req,res)=>{
    res.json({
        success:true,
        path: `/${req.file.path}`
    });
})

// router.post("/del/t", uploadThumbnails.single("file"), async(req, res) => {
//               await unlinkAsync(`.`+req.body.path);
//               res.json({
//                 success: true,
//                 message: "file deleted",
//               });
// });

// router.post("/del/v", uploadVideos.single("file"), async(req, res) => {
//     await unlinkAsync(`.`+req.body.path);
//     res.json({
//       success: true,
//       message: "file deleted",
//     });
// });


module.exports = router;