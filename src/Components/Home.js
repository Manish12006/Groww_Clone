import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from './Universalwallet'; // Import useWallet hook
import SearchBar from './SearchBar'; // Corrected import path
import SearchResultsList from './SearchResultsList'; // Corrected import path

const Home = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const { wallet } = useWallet(); // Retrieve wallet balance
  const [dashboardmodal, setdashboardmodal] = useState(false)
  const [stocksmodal, setstocksmodal] = useState(false)
  const [togglelogout, settogglelogout] = useState(false)

  const toggledashboardlink= ()=>{
    setdashboardmodal(!dashboardmodal)
    console.log("Check : ",dashboardmodal)
    setstocksmodal(false)
  }

  const togglestocks= ()=>{
    setstocksmodal(!stocksmodal)
  }

  const handlelogoutconf = () =>{
    navigate('/')
  }

  const handlecancel = () =>{
    settogglelogout(false)
  }

  const handlelogout = ()=>{
    settogglelogout(true);
  }
  

  return (
    <div className='main-body'>
      {stocksmodal && (
        <div className="stocksmodalbox">
          
          <div className='stocksboxnew1' onClick={togglestocks}  >
            <div className='zomatomainnew' onClick={()=>navigate('/zomato')}>
              <p className='zomatotextnew' >ZOMATO</p>
            </div>
            <div className='hdfcmainnew' onClick={()=>navigate('/hdfc')}>
              <p className='hdfctextnew' >HDFC BANK</p>
            </div>
            <div className='tatasteelmainnew'  onClick={()=>navigate('/tatasteel')}>
              <p className='tatasteeltextnew' >TATASTEEL</p>
            </div>
            <div className='sbimainnew'  onClick={()=>navigate('/sbi')}>
              <p className='sbitextnew' >SBI</p>
            </div>
            <div className='tcsmainnew' onClick={()=>navigate('/tcs')}>
              <p className='tcstextnew' >TCS</p>
            </div>
          </div>

          
          
        
        </div>
        )}


      <div className="groww-logo">
        <img className="groww-logo" src={require('./Groww_logo.png')} alt='groww-logo' />

        <div className="search-bar-container">
          <SearchBar setResults={setResults} />
          {results.length > 0 && <SearchResultsList results={results} />}
        </div>
        
        {/* Display wallet balance */}
        <div className="walletshow">
          <p>WALLET: ₹{wallet.toFixed(2)}</p>
        </div>


        {dashboardmodal && (
        <div className="modalbox1">
        <div className='dashboardmain' onClick={()=>navigate('/dashboardgroww')} >
          <p className='dashboardtext'  >DASHBOARD</p>
        
        
        </div>
        <div className='depositmainnew' onClick={()=>navigate('/Deposit')}>
          <p className='deposittextnew' >DEPOSIT</p>
        </div>
        <div className='Stocksmainnew' onClick={togglestocks} >
          <p className='Stockstextnew' >STOCKS</p>
          
          
        </div>
        <div className='transactionmainnew' onClick={()=>navigate('/transaction')} >
          <p className='transactiontextnew' >TRANSACTIONS</p>
          
          
        </div>
           
        <div className='appointmentmainnew' onClick={()=>navigate('/appointment')} >
          <p className='appointmenttextnew' >APPOINTMENT</p>
          
        </div>  
        <div className='logoutmainnew' onClick={handlelogout} >
          <p className='logouttextnew' >LOG OUT</p>
          
        </div>             
        </div>
        )}

{togglelogout && (
        <div className="modalboxlogout">
          <dic className='modalelements' >
            <div className='greenbox' ></div>
            <p className='growwsaystext' >Groww.in says</p>
            <p className='logouttext' >Are you sure you want to log out?</p>
            
            <button className='logoutbutton' onClick={handlelogoutconf}>LOG OUT</button>
            <button className='cancelbutton' onClick={handlecancel} >CANCEL</button>
          </dic>
        </div>
        )}

        <div className='dashboardlink' onClick={toggledashboardlink} >
          <p>ACCOUNT</p>
        </div>







        <p className='main-heading-1'>All things finance,</p>
        <p className='main-heading-2'>right here.</p>
        <p className='main-heading-3'>Built for a growing India.</p>

        <button type='button' className='login-signup' onClick={() => navigate("/Login")}>Login/Signup</button>

        <img className="city" src={require('./smart-city.png')} alt='city'></img>
        <img className="mobile" src={require('./Mobile.png')} alt='mobile'></img>
        <p className='second-heading'>Indian markets at</p>
        <p className='second-heading-2'>your fingertips.</p>
        <p className='second-heading-3'>Long-term or short-term, high risk or low risk. Be the kind of investor you want to be.</p>
        <div className='stocks-intraday'>
          <img alt='stocks' src={require('./stock.png')} className='stock-icon'></img>
          <img alt='chevron-right' src={require('./chevron-png.png')} className='chevron-right'></img>
          <p className='box-1-text'>Stocks and Intraday</p>
        </div>

        <div className='mutual-funds'>
          <img alt='stocks' src={require('./mutual-fund.png')} className='stock-icon'></img>
          <img alt='chevron-right' src={require('./chevron-png.png')} className='chevron-right'></img>
          <p className='box-1-text'>Mutual funds & SIPs</p>
        </div>

        <div className='futures-options'>
          <img alt='stocks' src={require('./futuress.png')} className='stock-icon'></img>
          <img alt='chevron-right' src={require('./chevron-png.png')} className='chevron-right'></img>
          <p className='box-1-text'>Futures & Option</p>
        </div>

        <p className='credit'>Credit,</p>
        <p className='need'>When you need it.</p>
        <p className='loan'>Apply for a loan, get it within minutes.</p>
        <a href='https://credit.groww.in/' target='_blank' >
        <button type='button' className='know1'>Know more</button>
        </a>
        <img alt='loan-img' src={require('./Loan.png')} className='loan-img '></img>
        <img alt='mobile-2' src={require('./Mobile_final.png')} className='mobile-2 '></img>

        <p className='bills'>All your bills in</p>
        <p className='place'>one place</p>
        <p className='pay'>Apply for a loan, get it within minutes.</p>
        <a href='https://groww.in/bill-payments' target='_blank'>
        <button type='button' className='know2'>Know more</button>
        </a>
        <img alt='scholarship-img' src={require('./Scholarship.png')} className='scholarship-img'></img>
        <p className='finance'>Finance simplified,</p>
        <p className='lang'>in your language.</p>
        <div className='footernew'>
          <h4 className='footerteam' >OUR TEAM MEMBERS</h4>
          <h4 className='footermanish' >Manish Ghanshani</h4>
          <h4  className='footersumit'>Sumit Kesarwani</h4>
          <h4  className='footermahima'>Mahima Maurya</h4>
          <h4  className='footerharsh'>Harsh Bhosale</h4>
        </div>

      </div>
    </div>
  );
}

export default Home;
