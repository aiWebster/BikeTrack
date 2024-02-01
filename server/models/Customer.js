const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  workOrders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkOrder'
  }]
});

module.exports = mongoose.model('Customer', CustomerSchema);
