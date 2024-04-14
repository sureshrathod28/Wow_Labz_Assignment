import React, { useState } from 'react';
import { loadScript } from './utils'; // Create a utility function to dynamically load scripts
import { useLocation ,useNavigate} from 'react-router-dom';
import "./payment.css"
const PaymentComponent = () => {
 const [paymentAmount, setPaymentAmount] = useState(); // Amount in paise (1 INR = 100 paise)
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const location = useLocation();
  const totalAmount = location.state ? location.state.totalAmount : 0;
   const navigate=useNavigate()
  const initializePayment = async () => {
    // Load Razorpay script dynamically
    await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    const amountInPaise = Math.round(totalAmount * 100);
    const response = await fetch('http://localhost:8080/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amountInPaise }),
    });

    const data = await response.json();
    setOrderId(data.orderId);

    const options = {
      key: 'rzp_test_GuFK7I2tKrydIo',
      amount: amountInPaise,
      currency: 'INR',
      name: 'Fashion Store',
      description: 'Payment for your service',
      image: 'https://images-platform.99static.com//AKW7WCkZwZOFns5QCaDZi74TvSI=/305x1578:1005x2278/fit-in/500x500/projects-files/41/4159/415999/e34e2568-96cb-4e8e-bab8-6b97d95c90c2.png',
      order_id: orderId,
      handler: async (response) => {
        const orderDetailsResponse = await fetch(`http://localhost:8080/order-details/${orderId}`);
        const orderDetailsData = await orderDetailsResponse.json();
        setOrderDetails(orderDetailsData);
        alert('Payment successful! Your order is placed.');
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };
 console.log(orderDetails)
  return (
    <div className='payment-container'>
      <h3 className='payment-content'>Payment Amount: {totalAmount.toFixed(2)} INR</h3>
      <button onClick={initializePayment} className='payment-btn'>Pay Now</button>
      {orderDetails && (
        <div className='order-details'>
          <h3>Order Placed Successfully!</h3>
          <p>Order ID: {orderDetails.orderId}</p>
          {/* Display other order details as needed */}
          <button className='payment-btn' onClick={()=>{navigate('/home')}}>Go to home</button>
        </div>
      )}
     
    </div>
  );
};

export default PaymentComponent;
