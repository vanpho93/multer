var express = require('express');
var bodyParser = require('body-parser');

var multer  = require('multer');

var storage1 = multer.diskStorage(
  {
    destination: function(req, file, cb){
      cb(null, "uploads");
    },
    filename: function(req, file, cb){
      console.log(file);
      cb(null, Date.now() + file.originalname);
    }
  }
);

function fileFilter(req, file, cb){
  if(file.mimetype == "image/png"){
    cb(null, true);
  }else{
    cb(new Error('KHONG DUNG LOAI FILE'));
  }
}

var limit = {fileSize: 30*1024};

var upload = multer({ storage: storage1, limits: limit, fileFilter: fileFilter }).array("avatar");

var parser = bodyParser.urlencoded({extended: false});
var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.listen(3000);

app.get('/', function(req, res){
  res.render('homepage');
});

// app.post('/profile',
//           upload.single('avatar'),
//           function (req, res) {
//   res.send('Da nhan');
// })

app.post('/profile', function(req, res){
  upload(req, res, function(err){
    if(err){
      res.send('Loi ' + err);
    }else{
      res.send('Thanh cong');
    }
  });
});
//MULTER
