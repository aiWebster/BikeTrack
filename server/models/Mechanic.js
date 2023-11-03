const mongoose = require('mongoose');

const MechanicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    empId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    empStatus: {
        type: String,
        required: true,
        enum: ['employee', 'manager'],
        default: 'employee'
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

const Mechanic = mongoose.model('Mechanic', MechanicSchema);

module.exports = Mechanic;