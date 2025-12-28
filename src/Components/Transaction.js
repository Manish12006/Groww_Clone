import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Transaction.css'
import { useNavigate } from 'react-router-dom';


export const Transaction = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/transactiondata');
        setItems(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3 className='transactionhistory' >Transaction history</h3>
      <button type='button' className='backbuttontransaction' onClick={()=>{navigate(-1)}}>BACK</button>
      <hr className='rulertransaction' ></hr>
      <div className='scrollmaintransaction' >
        
      <table className='maintable' >
        <thead>
          <th>Name</th>  
          <th>Amount</th>
          <th>Time</th>
        </thead>
        <tbody className='tbody' >
        {items.map(item => (
          <tr key={item._id} >
              <td>{item.name}</td>              
              <td>+{item.amount}</td>                           
              <td>{item.currenttime}</td>
          </tr>
        ))}
        </tbody> 
      </table>
      </div>
    </div>
  );
};

export default Transaction;
