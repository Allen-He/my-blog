const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../util/sendRes');
const multer = require('multer');
const path = require('path');

// 在哪里存储文件？文件怎么命名？
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../public/resource/upload'));
  },
  filename: function (req, file, cb) {
    const timeStamp = Date.now();
    const randStr = Math.random().toString(36).slice(-6);
    const ext = path.extname(file.originalname);
    const filename = timeStamp + '-' + randStr + ext;
    cb(null, filename);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 150 * 1024, //限制大小150KB
  },
  fileFilter(req, file, cb) {
    const extname = path.extname(file.originalname);
    const allowExt = ['.png', '.jpg', '.jpeg', '.gif']; //允许上传的文件后缀名的“白名单”
    if(allowExt.includes(extname)) {
      cb(null, true);
    } else {
      cb(new Error(`your file's extname ${extname} is not allowed`));
    }
  },
});

router.post('/img', upload.array('picFile', 3), asyncHandler(async (req, res, next) => {
  const files = req.files;
  const urlArr = [];
  for (let i = 0; i < files.length; i++) {
    const url = '/resource/upload/' + files[i].filename;
    urlArr.push(url);
  }
  return urlArr;
}));

module.exports = router;
