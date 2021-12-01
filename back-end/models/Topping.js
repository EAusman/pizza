var mongoose = require('mongoose');
var toppingSchema = new mongoose.Schema({
      name: String,
      path: String,
      price: Number,
});
toppingSchema.virtual('id').get(function() {
	return this._id.toHexString();
});
toppingSchema.set('toJSON', {
    virtuals: true
});
const Topping = mongoose.model('Topping', toppingSchema);
module.exports = Topping;
