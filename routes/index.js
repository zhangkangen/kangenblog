var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '张小康的博客' });
});

router.post('/',function(req,res,next){
	console.log(req.body.q);
	res.render('index',{title:'张小康的博客'});
});

module.exports = router;
