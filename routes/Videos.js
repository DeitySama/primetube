const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js')
const {getVideos,createVideo,getVideo,updateVideo,deleteVideo} = require('../controllers/Video.js')

router.route('/')
.post(auth,createVideo)
.get(getVideos)

router.route('/:id')
.put(auth,updateVideo)
.get(getVideo)
.delete(auth,deleteVideo)

module.exports = router;