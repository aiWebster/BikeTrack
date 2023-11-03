import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArchivedWorkOrders = () => {
    const [archivedOrders, setArchivedOrders] = useState([]);

    useEffect(() => {
        const fetchArchivedOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/workorders/archived');
                setArchivedOrders(response.data);
            } catch (error) {
                console.error("Error fetching archived orders:", error);
            }
        };

        fetchArchivedOrders();
    }, []);

    return (
        <div>
            <h2>Archived Work Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th>Work Order ID</th>
                        <th>Date</th>
                        <th>Customer Name</th>
                        <th>Services Completed</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {archivedOrders.map(order => (
                        <tr key={order._id || order.workOrderId}>
                            <td>{order.workOrderId}</td>
                            <td>{order.date}</td>
                            <td>{order.customerName}</td>
                            <td>{order.servicesCompleted}</td>
                            <td>{order.cost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ArchivedWorkOrders;
