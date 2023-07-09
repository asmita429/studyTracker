var express = require('express');
var router = express.Router();
const Studies = require('../models/studies');
const Logins = require('../models/logins');
// const studies = require('../models/studies');

/* GET home page. */
// router.post('/login',async function(req,res,next) {
//   let logins = new Logins({
//   "username" : req.body.username, 
//   "password" : req.body.password,
// });
// if(logins.username = )
// await Logins.insertMany(logins);
// res.redirect('/main');
// });


router.get('/', function(req, res, next) {
  Studies.find().then((studies) =>{
    const studiesWithExceeded = [];
    
    studies.forEach(study => {
      let exceeded;
      const dateCheck = new Date();
      dateCheck.setTime(dateCheck.getTime() - (study.time*60*60*1000))
      
      if (dateCheck > study.createdAt) {
        exceeded = 'Exceeded';
      } else {
        exceeded = 'You still have time';
      }

      studiesWithExceeded.push({ ...study.toObject(), exceeded });
    });

    res.render('index', 
    { title: 'Study to-do', 
    studyList: studiesWithExceeded });
  })
});

router.get('/add',function(req, res, next) {
  res.render('addStudies');
});



router.post('/saveStudies',async function(req,res,next){
  let studies = new Studies({
    "title" : req.body.title, 
    "description" : req.body.description,
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
  console.log(Studies)
  var formData = {
    "title" : req.body.title, //form title name ='title'
    "description" : req.body.description,
    "time" : parseInt(req.body.time)
  };

  console.log(formData);
  await Studies.findOneAndUpdate(
  { _id : req.params.id},
  { $set: { ...formData}});
  res.redirect('/');
});


router.get('/links',function(req, res, next) {
  res.render('exploreNotes');
});



router.post('/done/:id',async function(req, res, next) {
  
    await Studies.findOneAndUpdate(
    { _id : req.params.id},
    { $set: {"done":true}});
    res.redirect('/')
})


// router.get('/getStarted', function(req,res, next){
//   req.render('getStarted');
// })


router.get('/done', function(req, res, next) {
    Studies.find().then((studies) =>{
      res.render('tasksDone', 
      { title: 'Study track', 
      doneList: studies });
    })
});


module.exports = router;
