const express = require('express');
const router = express.Router();
const Mechanic = require('../models/Mechanic'); 
const bcrypt = require('bcryptjs');
const isAuth = require('../middleware/isAuth');
const JWT_KEY = process.env.JWT_KEY;
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { name, empId, empStatus, password } = req.body;

    try {
        let mechanic = await Mechanic.findOne({ empId });

        if (mechanic) {
            return res.status(400).json({ message: 'Mechanic with this ID already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        mechanic = new Mechanic({
            name,
            empId,
            empStatus,
            password: hashedPassword  // Store the hashed password
        });

        await mechanic.save();

        res.json({ message: 'Mechanic added successfully', mechanic });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login route
router.post('/login', async (req, res) => {
    console.log("Login request received"); // Log that a request has been received

    const { empId, password } = req.body;

    try {
        // Find the mechanic by empId
        let mechanic = await Mechanic.findOne({ empId });

        // If mechanic not found, send error
        if (!mechanic) {
            return res.status(400).json({ success: false, message: 'Invalid Employee ID or Password' });
        }

        // Compare provided password with stored hashed password
        const isMatch = await bcrypt.compare(password, mechanic.password);

        // If password doesn't match, send error
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid Employee ID or Password' });
        }
       // Generate JWT
       const payload = {
        mechanic: {
            id: mechanic.id
        }
    };

    jwt.sign(
        payload,
        JWT_KEY,  
        { expiresIn: '1h' },  // Token expires in 1 hour
        (err, token) => {
            if (err) throw err;
            res.json({ success: true, token, message: 'Logged in successfully' });
        }
    );
        // If everything is okay, send success response
        //res.json({ success: true, message: 'Logged in successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    };


});
module.exports = router;
