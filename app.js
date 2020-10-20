const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const dotenv = require("dotenv");


let DIR = './attach';
dotenv.config();

let storage= multer.diskStorage({
  destination:function(req, file, cb){
      cb(null, DIR)
  },
  filename:function(req, file, cb){
      cb(null, file.fieldname +'-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length-1])
  }
})
let upload = multer({ storage: storage }).single("Image"); //Field name and max count


var mongoURI = process.env.DB_CONNECT || 'mongodb+srv://demonew:demo123456@cluster0.yw73h.mongodb.net/newproject?retryWrites=true&w=majority';

mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true,   useFindAndModify: false, },
  ()=> console.log('connected to db'));

// Import models
const imgModel = require("./model/image");
const contactModel= require("./model/ContactInfo");

//const bodyParser = require("body-parser");

// Middlewares
let app = express()
app.use(cors());
app.use(express.json())

app.use("/myimages", express.static("attach"));
app.use(express.static(path.join(__dirname, './attach')));
app.use('/', express.static(path.join(__dirname, './attach')));
/*app.get("/server/getuploadImg", function(req, res) {
  imgModel.find({}, function(err, data) {
    if (err) throw err;
    res.send({ data: data });
  })
})*/// long method

/*app.get("/server/getuploadImg", async function(req, res) {
  const data = await imgModel.find();
     res.send({ data: data });
   });//short method*/


   app.get('**', (req, res) =>{
    res.sendFile(path.join(__dirname, './attach/index.html'));
  });//short method



app.get("/server/getuploadImg", async (req, res) =>{
  const data = await imgModel.find();
     res.send({ data: data });
   });//short method

app.get("/server/getuploadImg/:id", async (req, res) =>{
  const data = await imgModel.findById(req.params.id);
     res.send({ data: data });
   });//single data get


app.put("/server/getuploadImg/:id", function(req, res) {

    upload(req, res, async function (err) {
      if (err) {
        res.json({ err: err });
      } else {
        let ititle = req.body.ititle;
        let fname = req.file.filename;
         //for category
        let category = req.body.catgry;
    
        let updateins = new imgModel({
          ititle: ititle,
          image: fname,
          //for category
          catgry: category
        });
    
    if(req.body.ititle==1)
    {
      let updatedata = await imgModel.findByIdAndUpdate({_id: req.params.id},{$set: {ititle: ititle,
        image: fname,
        catgry: category}},null);
        updatedata.save(function (err) {
          if (err) throw err;
          res.json({ msg: "successfully inserted..." });
        })
    }

    if(req.body.ititle==2)
    {
      let updatedata = await imgModel.findByIdAndUpdate({_id: req.params.id},{$set: {ititle: ititle,
        image2: fname,
        catgry: category}},null);
        updatedata.save(function (err) {
          if (err) throw err;
          res.json({ msg: "successfully inserted..." });
        })
    }

    if(req.body.ititle==3)
    {
      let updatedata = await imgModel.findByIdAndUpdate({_id: req.params.id},{$set: {ititle: ititle,
        image3: fname,
        catgry: category}},null);
        updatedata.save(function (err) {
          if (err) throw err;
          res.json({ msg: "successfully inserted..." });
        })
    }

    if(req.body.ititle==4)
    {
      let updatedata = await imgModel.findByIdAndUpdate({_id: req.params.id},{$set: {ititle: ititle,
        image4: fname,
        catgry: category}},null);
        updatedata.save(function (err) {
          if (err) throw err;
          res.json({ msg: "successfully inserted..." });
        })
    }

      }
    });


});//updatae data

app.delete("/server/getuploadImg/:id", async (req, res) => {
 try{
const removedata = await imgModel.findByIdAndRemove(req.params.id);
res.json(removedata);
 }catch(error){
res.json({message : error});
 }
   });//delete data


app.post("/server/uploadImg", function(req, res) {
  upload(req, res, async function (err) {
    if (err) {
      res.json({ err: err });
    } else {
      let ititle = req.body.ititle;
      let fname = req.file.filename;
      //for category
      let category = req.body.catgry;

      let ins = new imgModel({
        ititle: ititle,
        image: fname,
        //for category
        catgry: category
      });
      await ins.save(function (err) {
        if (err) throw err;
        res.json({ msg: "successfully inserted..." });
      })
    }
  })
})

/************New code */
app.post("/server/uploadImg2", function(req, res) {
  upload(req, res, function (err) {
    if (err) {
      res.json({ err: err });
    } else {
      let ititle = req.body.ititle;
      let fname = req.file.filename;
      //for category
      let category = req.body.catgry;

      let ins = new imgModel({
        ititle: ititle,
        image2: fname,
        //for category
        catgry: category
      });
      ins.save(function (err) {
        if (err) throw err;
        res.json({ msg: "successfully inserted..." });
      })
    }
  })
})

app.post("/server/uploadImg3", function(req, res) {
  upload(req, res, function (err) {
    if (err) {
      res.json({ err: err });
    } else {
      let ititle = req.body.ititle;
      let fname = req.file.filename;
      //for category
      let category = req.body.catgry;

      let ins = new imgModel({
        ititle: ititle,
        image3: fname,
        //for category
        catgry: category
      });
      ins.save(function (err) {
        if (err) throw err;
        res.json({ msg: "successfully inserted..." });
      })
    }
  })
})

app.post("/server/uploadImg4", function(req, res) {
  upload(req, res, function (err) {
    if (err) {
      res.json({ err: err });
    } else {
      let ititle = req.body.ititle;
      let fname = req.file.filename;
      //for category
      let category = req.body.catgry;

      let ins = new imgModel({
        ititle: ititle,
        image4: fname,
        //for category
        catgry: category
      });
      ins.save(function (err) {
        if (err) throw err;
        res.json({ msg: "successfully inserted..." });
      })
    }
  })
})



//app.post("/server/uploadContactUs", function(req, res) {
//  upload(req, res, function (err) {
//    if (err) {
//      let ititle = req.body.ititle;
//      let fname = req.file.filename;
//      let ins = new imgModel({
//        ititle: ititle,
//        image4: fname
//      });
//      ins.save(function (err) {
//        if (err) throw err;
//        res.json({ msg: "successfully inserted..." });
//      })
//    } else {
//      let ititle = req.body.ititle;
//      let fname = req.file.filename;
//      let ins = new imgModel({
//        ititle: ititle,
//        image4: fname
//      });
//      ins.save(function (err) {
//        if (err) throw err;
//        res.json({ msg: "successfully inserted..." });
//      })
//    }
//  })
//})

app.post("/server/uploadContactUs", async (req, res) =>{
  const listeing = new contactModel({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    Email:req.body.Email,
    subject:req.body.subject,
    description:req.body.description,
  });
  try{
    const saved = await listeing.save();
    res.send(saved)
  }catch(error) {
    res.status(400).send(error);
  }
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("app listeing on port:", port);
})  

/***** */
// git add .
//git commit -m 'abhiiphotography'
//git push heroku master
//heroku open