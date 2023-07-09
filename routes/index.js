var express = require('express');
var router = express.Router();
const Studies = require('../models/studies');

/* GET home page. */

router.get('/', function(req, res, next) {
  Studies.find().then((studies) =>{
    res.render('index', 
    { title: 'Study to-do', 
    expenseList: studies });
  })
});

router.get('/add',function(req, res, next) {
  res.render('addStudies');
});


router.post('/saveStudies',async function(req,res,next){
  let studies = new Studies({
    "title" : req.body.title, 
    "descriotion" : req.body.descriotion,
    "time" : parseInt(req.body.time)
  })
  
  await Studies.insertMany(studies);
  res.redirect('/');
});

router.get('/delete/:index',async function(req,res,next){
  await Studies.deleteOne({ _id: req.params.index });
  res.redirect('/');
});

router.get('/edit/:id',async function(req,res, next){
  const studies =await Studies.findOne({ _id : req.params.id});

  res.render('editStudies',{studies:studies});
});

router.post('/saveEdited/:id',async function(req,res, next){
  var formData = {
    "title" : req.body.title, //form title name ='title'
    "descriotion" : req.body.descriotion,
    "time" : parseInt(req.body.time)
  };
  await Studies.findOneAndUpdate(
  { _id : req.params.id},
  { $set: { ...formData}});
  res.redirect('/');
});

module.exports = router;
