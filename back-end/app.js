var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const bodyParser = require("body-parser");

//-----
//Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pizzalab');
const PizzaOrder = require('./models/PizzaOrder');
const Topping = require('./models/Topping');


//----
//var cors = require('cors')
//
//if (NODE_ENV !== 'production') {
//       app.use(cors())
//}

var app = express();
var router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const multer = require('multer')
const upload = multer({
    dest: 'public/images/',
    limits: {
	fileSize: 10000000
    }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//-----
//Controllers
router.get('/api/toppings', async function(req, res) {
    try {
	let toppings = await Topping.find();
	res.send({
	    toppings: toppings
	});
    } catch (error) {
	console.log(error);
	res.sendStatus(500);
    }
});

router.get('/api/toppings/:id', async function(req, res) {
    try {
	let toppings = await Topping.findById(req.params.id);
	res.send({
	    toppings: toppings
	});
    } catch (error) {
	console.log(error);
	res.sendStatus(500);
    }
});
router.delete('/api/toppings/:id', async function(req, res) {
    try {
	let toppings = await Topping.findByIdAndRemove(req.params.id);
	res.sendStatus(200);
    } catch (error) {
	console.log(error);
	res.sendStatus(500);
    }
});

router.post('/api/photos', upload.single('photo'), async function(req, res) {
    	if (!req.file) {
		return res.sendStatus(400);
	}
    	res.send({
	    path: "/images/" + req.file.filename
	});
});

router.post('/api/toppings', async function(req, res) {
	    let topping = new Topping({
		name: req.body.name,
		path: req.body.path,
		price: req.body.price,
	    });
	    try {
		await topping.save();
		res.send({
		    topping:topping
		});
	    } catch (error) {
		console.log(error);
		res.sendStatus(500);
	    }
});

router.get('/api/pizzaOrders', async function(req, res) {
    try {
	let pizzaOrder = await PizzaOrder.find();
	res.send({
	    pizzaOrder: pizzaOrder
	});
    } catch (error) {
	console.log(error);
	res.sendStatus(500);
    }
});
router.post('/api/pizzaOrders', async function(req, res) {
    		console.log(req.body);
	    let pizzaOrder = new PizzaOrder({
		name: req.body.name,
		toppings: req.body.toppings,
		price: req.body.price,
		address: req.body.address,
	    });
	    try {
		await pizzaOrder.save();
		res.send({
		    pizzaOrder:pizzaOrder
		});
	    } catch (error) {
		console.log(error);
		res.sendStatus(500);
	    }
});

router.delete('/api/pizzaOrders/:id', async function(req, res) {
    try {
	let pizzaOrders = await PizzaOrder.findByIdAndRemove(req.params.id);
	res.sendStatus(200);
    } catch (error) {
	console.log(error);
	res.sendStatus(500);
    }
});

router.put('/api/toppings/:id', async(req,res) => {
	try {
	    let id = req.params.id;
	    let newName = req.body.name;
	    //let newPath = req.body.path;
	    let newPrice = req.body.price;
	    console.log("Updating topping with id: "+id);
	    let item = await Topping.findById(id);
	    item.name = newName;
	    //item.path = newPath;
	    item.price = newPrice;
	    item.save();
	} catch(error) {
	    console.log(error);
	    res.sendStatus(500);
	}
});

//------
module.exports = app;
