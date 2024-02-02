require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const cors = require('cors'); 
const mechanicRoutes = require('./routes/mechanicRoutes');
const workOrderRoutes = require('./routes/workorders');

dotenv.config();
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);
const app = express();

app.use(cors()); 

app.use(express.json());

app.use('/api/mechanics', mechanicRoutes);
app.use('/api/workorders', workOrderRoutes);

  mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
  });
})
.catch(err => {
  console.error('Failed to connect to MongoDB', err);
}); 

 app.post('/api/Mechanics', async (req, res) => {
    console.log(req.body);
    const { name, empId, password, role } = req.body;
  
    try {
      let mechanic = await Mechanic.findOne({ empId });
  
      if (mechanic) {
        return res.status(400).json({ message: 'Mechanic already exists' });
      }
  
      mechanic = new Mechanic({
        name,
        empId,
        password,
        role,
      });
  
      // hash the password before saving the mechanic
      const salt = await bcrypt.genSalt(10);
      mechanic.password = await bcrypt.hash(password, salt);
  
      await mechanic.save();
  
      res.json({ message: 'Mechanic added successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
}); 
