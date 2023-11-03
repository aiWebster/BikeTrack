
const mongoose = require('mongoose');

const WorkOrderSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true
        //default: 'open',
    },
    workOrderId:{
        type: String,
        required: true
    },
    empId: {
        type: Number,
        required: true
    },
    mechanicName: {
        type: String,
        required: true
    },
    bike: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: () => new Date().toISOString().split('T')[0] 
    },
    servicesCompleted: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerNumber: {
        type: String,
        required: true
    },
    notes: {
        type: String
    }
});

WorkOrderSchema.index({ workOrderId: 1 });

module.exports = mongoose.model('WorkOrder', WorkOrderSchema);
