import React, { useState } from 'react';
import './Deposit.css';
import { Await, useNavigate } from 'react-router-dom';
import { useWallet } from './Universalwallet';
import { format } from 'date-fns';


const Deposit = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [amount, setAmount] = useState('');
  const { wallet, setWallet } = useWallet();
  const [name, setname]=useState('');
  const [date2, setdate2]=useState('')

  const [currenttime, setcurrenttime] = useState('')

 
  
  const [notifyname, setnotifyname]= useState(false)
  const [security, setsecurity]=useState('')
  const [notifysecurity, setnotifysecurity]= useState(false)

  const [date1, setdate1]=useState('')
  const [notifydate1, setnotifydate1]= useState(false)




  const handleAmountNumberChange = (e) => {
    const value = e.target.value;
    setAmount(value);
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    setCardNumber(value);
    if (value.length <= 16 && value.length >= 15) {
      setErrorMessage(''); // Clear the error message when the input is valid
    }
  };

  const handlenamechange = (e)=>{
    const value = e.target.value;
    setname(value)
  }

  const handlesecuritychange = (e)=>{
    const value = e.target.value;
    setsecurity(value)
  }

  const handledate1change = (e)=>{
    const value = e.target.value;
    setdate1(value)
  }

  const handledate2change = (e)=>{
    const value = e.target.value;
    setdate2(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (cardNumber.length !== 16) {//!==16
      setErrorMessage('Only 16 numbers*');
    } 
    else if(name.length === 0){
      setnotifyname(true)

    }
    else if(date1 ===0){
      setnotifydate1(true)
    }
    else if(security.length !==3){
      setnotifysecurity(true)
    }
    
    else {
      setErrorMessage('');
      // Update wallet balance
      setWallet(wallet + parseFloat(amount));
      alert('Payment successfull')
      //CODE FOR FETCH INTEGRATION
      const currentday = format(new Date(), 'dd')
        const currentmonth = format(new Date(), 'EEEE')
        const currentyear = format(new Date(), 'yyyy')
        const currenthour = format(new Date(), 'HH')
        const currentminute = format(new Date(), 'mm')
        console.log(currentday, currentmonth, currentyear, currenthour, currentminute)
        const timeconcat = `${currentday} ${currentmonth} ${currentyear} at ${currenthour}:${currentminute}am`;
        setcurrenttime(timeconcat)
     


      
      const item = { amount, cardNumber, name, date1, date2, security, currenttime: timeconcat };

    try {
      const response = await fetch('http://localhost:5000/transactiondata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        alert('Data transferred and added successfully');
        
        
        setAmount('');
        setCardNumber('');
        setname('');
        setdate1('');
        setdate2('');
        setsecurity('');
      } else {
        const errorText = await response.text(); // Retrieve error message from response
        alert(`Error transferring data: ${errorText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error transferring transaction data');
    }
      
      
      

      


      navigate('/home');
    }
  };

  return (
    <div className='depositmain'>


      {notifyname && (
      <div className="modalbox">
        <div className="modalbody">
          <img src={require('./error.png')} alt='error' className='errorpng'></img>
          <p className='errortext' >ERROR!!! </p>
          <p className='nametext' >Name is mandatory</p>
        
        <div onClick={()=> setnotifyname(false)} className='crossmain'>
          
          <div className='closebutton' ></div>
          <img src={require('./close-sign-black.png')} alt='close-sign-black' className='closesignblack' ></img>
        </div>
          
          
        </div>
      </div>
      )}

      {notifydate1 && (
      <div className="modalbox">
        <div className="modalbody">
          <img src={require('./error.png')} alt='error' className='errorpng'></img>
          <p className='errortext' >ERROR!!! </p>
          <p className='nametext' >Date is invalid!</p>
        
        <div onClick={()=> setnotifydate1(false)} className='crossmain'>
          
          <div className='closebutton' ></div>
          <img src={require('./close-sign-black.png')} alt='close-sign-black' className='closesignblack' ></img>
        </div>
          
          
        </div>
      </div>
      )}

      {notifysecurity && (
      <div className="modalbox">
        <div className="modalbody">
          <img src={require('./error.png')} alt='error' className='errorpng'></img>
          <p className='errortext' >ERROR!!! </p>
          <p className='nametext' >Security code is invalid!</p>
        
        <div onClick={()=> setnotifysecurity(false)} className='crossmain'>
          
          <div className='closebutton' ></div>
          <img src={require('./close-sign-black.png')} alt='close-sign-black' className='closesignblack' ></img>
        </div>
          
          
        </div>
      </div>
      )}

      


      <form onSubmit={handleSubmit}>
        <button className='backbuttondeposit' onClick={() => navigate('/home')}>Back</button>
        <p className='depositfunds'>DEPOSIT FUNDS</p>
        <div className='greenline1'></div>
        <div className='container'>
          <p className='paymentdetails'>Payment Details</p>
          <div className='greenline2'></div>
          <img src={require('./Visa.png')} alt='Visacard' className='visacard' />
          <img src={require('./Mastercard.png')} alt='Mastercard' className='mastercard' />
          <img src={require('./Paypal.png')} alt='paypal' className='paypal' />
          <img src={require('./Rupay.png')} alt='rupay' className='rupay' />
          <p className='enteramount'>Amount</p>
          <input
            className='amountdepinp'
            type='text'
            placeholder='XXXX'
            value={amount}
            onChange={handleAmountNumberChange}
          />
          <p className='cardnumber'>Card Number</p>
          <input
            className='cardnumbervalue'
            type='text'
            placeholder='0123XXXXXXXXXXXXXX'
            id='cardnumberid'
            value={cardNumber}
            onChange={handleCardNumberChange}
          />
          {errorMessage && <p className='cardnumbererror'>{errorMessage}</p>}
          <p className='namecard'>Name on the Card</p>

          <input className='namecardvalue' 
          type='text' 
          placeholder='John Doe' 
          value={name}
          onChange={handlenamechange}/>

          <p className='expirydate'>Expiry Date</p>
          <input className='expiryvalue1' 
          type='text' 
          placeholder='09' 
          value={date1}
          onChange={handledate1change}/>

          <p className='slashexpiry'>/</p>
          <input className='expiryvalue2' type='text' placeholder='2024' onChange={handledate2change}/>
          <p className='securitycode'>Security Code</p>

          <input className='securitycodevalue' 
          type='text' 
          placeholder='* * *' 
          value={security}
          onChange={handlesecuritychange}/>
          <button className='paynowbutton' type='submit'  >Pay Now</button>

          
        </div>
      </form>
      
    </div>
  );
};

export default Deposit;
