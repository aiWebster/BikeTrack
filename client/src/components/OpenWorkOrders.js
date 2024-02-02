import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../OpenWorkOrders.css';

const OpenWorkOrders = () => {
    const [workOrders, setWorkOrders] = useState([]);

    const fetchWorkOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/workorders/open');
            console.log("Fetched work orders:", response.data);

            setWorkOrders(response.data);
        } catch (error) {
            console.error("Error fetching open work orders:", error);
        }
    };

    useEffect(() => {
        fetchWorkOrders();
    }, []);

    const handleStatusChange = async (event, workOrderId) => {
        const newStatus = event.target.value;
    
        try {
          await axios.put(`http://localhost:5000/api/workorders/${workOrderId}`, { status: newStatus });
    
          fetchWorkOrders(); 
        } catch (error) {
          console.error("Error updating work order status:", error);
        }
    };



    return (
        <div className='table-container'>
            <h2>Open Work Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th>Work Order ID</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Customer Name</th>
                        <th>Customer Number</th>
                        <th>Mechanic ID</th>
                        <th>Services Completed</th>
                        <th>Cost</th>
                       
                        {/* Add other fields as necessary */}
                    </tr>
                </thead>
                <tbody>
                    {workOrders.map(order => (
                        <tr key={order._id || order.workOrderId}>
                            <td>{order.workOrderId}</td>
                            <td>{order.date}</td>
                            <td> <select 
                                 value={order.status} 
                                 onChange={(e) => handleStatusChange(e, order.workOrderId)}
                            >
                                <option value="open">Open</option>
                                <option value="waiting for pickup">Waiting for Pickup</option>
                                <option value="archived">Archived</option>
                                </select></td>
                            <td>{order.customerName}</td>
                            <td>{order.customerNumber}</td>
                            <td>{order.empId}</td>
                            <td>{order.servicesCompleted}</td>
                            <td>{order.cost}</td>
                            
                            
                            {/* Add other fields as necessary */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OpenWorkOrders;
    