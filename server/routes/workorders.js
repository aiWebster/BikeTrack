const express = require('express');
const router = express.Router();
const WorkOrder = require('../models/WorkOrder');

router.post('/', async (req, res) => {
    const { 
        status,
        empId, 
        mechanicName, 
        bike, 
        servicesCompleted, 
        cost, 
        date, 
        customerName, 
        customerNumber, 
        generalNotes 
    } = req.body;

    try {
        // Generate a unique work order ID (you can customize this as needed)
        const workOrderId = `WO-${Date.now()}`;
        const formattedDate = new Date(req.body.date).toISOString().split('T')[0];

        const workOrder = new WorkOrder({
            status,
            workOrderId,
            empId,
            mechanicName,
            bike,
            servicesCompleted,
            cost,
            date: formattedDate,
            customerName,
            customerNumber,
            generalNotes
        });

        await workOrder.save();

        res.json({ message: 'Work order created successfully', workOrder });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});
//Open Workorders
router.get('/open', async (req, res) => {
    try {
        const openWorkOrders = await WorkOrder.find({
            status: { $in: ['open', 'waiting for pickup'] }
        });
        res.json(openWorkOrders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.get('/archived', async (req, res) => {
    try {
        const archivedWorkOrders = await WorkOrder.find({ status: 'archived' });
        res.json(archivedWorkOrders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.put('/:workOrderId', async (req, res) => {

  const { status } = req.body;
  const { workOrderId } = req.params;


  try {
    const workOrder = await WorkOrder.findOne({workOrderId: workOrderId});
    if (!workOrder) {
      return res.status(404).json({ message: 'Work order not found' });
    }

    workOrder.status = status;
    await workOrder.save();

    res.json({ message: 'Work order status updated successfully', workOrder });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
