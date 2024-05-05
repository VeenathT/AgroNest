const express = require('express');
const router = express.Router();
const multer = require('multer');
const LabReport = require('../../../models/Oshini/test_requests/labReport');
const TestRequest = require('../../../models/Oshini/test_requests/testRequest');
router.use("/uploads", express.static("uploads"))

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb){
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix+file.originalname)
  }
})

const upload = multer({storage: storage})

router.post("/upload-files",upload.single("file"),async(req,res)=>{
  console.log(req.file);
  const title=req.body.title;
  const fileName=req.file.filename;
  const requestId = req.body.requestId;

  const testRequest = await TestRequest.findOne({ _id: requestId });

  try{
    await LabReport.create({requestID: testRequest,pdf: fileName, title: title });
    res.send({status:"ok"});
  } catch(error){
    res.json({status:error})
  }

})

router.get("/get-files",async(req,res)=>{
    try{
        LabReport.find({}).then(data=>{
            res.send({status:"ok", data:data});
        });
    }catch(error){}
})

  
module.exports = router;