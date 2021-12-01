var mongoose = require('mongoose');
var pizzaOrderSchema = new mongoose.Schema({
      name: String,
      toppings: [{
	type: mongoose.Schema.Types.ObjectId,
	  ref: "Topping"
      }], //List of ordered ingredients
      price: Number,
});
pizzaOrderSchema.virtual('id').get(function() {
	return this._id.toHexString();
});
pizzaOrderSchema.set('toJSON', {
    virtuals: true
});

const PizzaOrder = mongoose.model('PizzaOrder', pizzaOrderSchema);
module.exports = PizzaOrder;
