import React, { useEffect, useState ,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import './Zomato.css';
import { useWallet } from './Universalwallet.js';
import { StockContext } from './Stockcontext.js';

const TickVideo = require('../assets/tick.mp4');
const TickVideo2 = require('../assets/tick2.mp4');

const HDFC = () => {
                                                                                        //CHANGE
  const [stockname, setstockname] = ("HDFC")
  
  const [stocks, setStocks] = useState([]);
  const [existingStock, setexistingstock] = useState(false)
  const { stocks:stockcontext,addStock,updateStock } = useContext(StockContext);
  const { wallet, setWallet } = useWallet();
  const [period, setPeriod] = useState('1y');
  const [data, setData] = useState(null);
  const [latestPrice, setLatestPrice] = useState(224.61); // Initialize with 0
  const [quantity, setQuantity] = useState(1);
  const [displayValue, setDisplayValue] = useState('');
  const [intervalId, setIntervalId] = useState(null);
                                                                                        //CHANGE
  const Instrument = "HDFC";
  const [finalValue, setFinalValue] = useState('');
  const [error, setError] = useState(''); // State for error message
  const [modal, setModal] = useState(false);
  const [playvideo, Setp1ayvideo] = useState(false)
  const [playvideo2, Setp1ayvideo2] = useState(false)
  const [sellmodal, setsellmodal] = useState(false)
                                                                                        //CHANGE
  const [fluctuate, Setfluctuate] = useState(1608.00)
  const Avgvalue = (displayValue/quantity);
  
          
          
  
  


  useEffect(() => {
    const intervalid = setInterval(() => {
      const change = Math.random() > 0.5 ? 0.50 : -0.50;
      Setfluctuate(prevValue => prevValue + change);
    }, 1000);
  
    return () => clearInterval(intervalid);
  }, []);
  

   useEffect(() => {
    // Calculate the display value whenever quantity or fluctuate changes
    if (quantity && fluctuate) {
      const calculatedValue = quantity * fluctuate;
      setDisplayValue(calculatedValue.toFixed(2));
    } else {
      setDisplayValue('');
    }
  }, [quantity, fluctuate]);

  const toggleModal = () => {
    setModal(!modal);
    setError(''); // Reset error when closing modal
  };

  const toggleSell = () =>{
    setsellmodal(!sellmodal);
    setError('')
    
  }
  const toggleplayvideo = ()=>{
    Setp1ayvideo(!playvideo)
    setError('')
    
  }
  const toggleplayvideo2 = ()=>{
    Setp1ayvideo2(!playvideo2)
    setError('')
   
  }


  const handleClick = (newPeriod) => {
    setPeriod(newPeriod);
  };

  const handleInputChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleCalculateClick = () => {
    const calculatedValue = quantity * fluctuate;
    setDisplayValue(calculatedValue.toFixed(2));
  };






  const handleBuyClick = () => {
    const calculatedFinalValue = quantity * fluctuate;
  
    if (calculatedFinalValue > wallet) {
      setError('Insufficient funds!!!');
    } else {
      setWallet(wallet - calculatedFinalValue);
      setFinalValue(calculatedFinalValue.toFixed(2));
      setError('');
  
      if (quantity === '') {
        return;
      } else {
        toggleplayvideo();
  
        // Check if the stock already exists
        const existingStock = stocks.find(stock => stock.Instrument === Instrument);
  
        if (existingStock) {
          
          // Update the existing stock entry
          const totalQuantity = parseInt(existingStock.quantity) + parseInt(quantity);
          const totalValue = (parseFloat(existingStock.Avgvalue) * parseInt(existingStock.quantity)) + (parseFloat(fluctuate) * parseInt(quantity));
          const newAvgValue = totalValue / totalQuantity;
  
          const updatedStock = {
            ...existingStock,
            quantity: totalQuantity.toString(),
            Avgvalue: newAvgValue.toFixed(2),
            LTP: fluctuate.toFixed(2),
            currentvalue: (newAvgValue * totalQuantity).toFixed(2),
            PandL: ((fluctuate - newAvgValue) * totalQuantity).toFixed(2)
          };
  
          updateStock(Instrument, updatedStock);
        } else {
          // Add a new stock entry
          const newStock = {
            stockname,
            Instrument,
            quantity,
            Avgvalue: fluctuate.toFixed(2),
            LTP: fluctuate.toFixed(2),
            currentvalue: (fluctuate * quantity).toFixed(2),
            PandL: ((fluctuate - Avgvalue) * quantity).toFixed(2)
          };
  
          addStock(newStock);
        }
  
        // Clear existing interval if any
        if (intervalId) {
          clearInterval(intervalId);
        }
  
        // Set a new interval for updates if needed
        const newIntervalId = setInterval(() => {
          // Update stock entries at intervals if needed
          const updatedStock = stocks.find(stock => stock.Instrument === Instrument);
  
          if (updatedStock) {
            const totalQuantity = parseInt(updatedStock.quantity);
            const totalValue = (parseFloat(updatedStock.Avgvalue) * totalQuantity) + (parseFloat(fluctuate) * totalQuantity);
            const newAvgValue = totalValue / totalQuantity;
  
            updateStock(Instrument, {
              quantity: totalQuantity.toString(),
              Avgvalue: newAvgValue.toFixed(2),
              LTP: fluctuate.toFixed(2),
              currentvalue: (newAvgValue * totalQuantity).toFixed(2),
              PandL: ((fluctuate - newAvgValue) * totalQuantity).toFixed(2),
            });
          }
        }, 1000);
  
        setIntervalId(newIntervalId);
      }
    }
  };

  const handleSellClick = () => {
    const calculatedFinalValue = quantity * fluctuate;
    const newexistingstock = stockcontext.find(stock => stock.Instrument === Instrument);
    // Check if the quantity to sell is valid
    if(stockcontext.find(stock => stock.Instrument === Instrument))
    {
      setexistingstock(true);
    }
    
    

    if (!newexistingstock) {
        setError("You don't own this stock!");
        return;
    } else if (parseInt(newexistingstock.quantity) < parseInt(quantity)) {
        setError('You do not have enough quantity');
        return;
    } else {
        setWallet(wallet + calculatedFinalValue);
        setFinalValue(calculatedFinalValue.toFixed(2));
        setError('');

        const remainingQuantity = parseInt(newexistingstock.quantity) - parseInt(quantity);

        if (remainingQuantity === 0) {
          console.log("Removing stock with Instrument:", Instrument);

    // Remove the stock with the given instrument from the stocks array
    const updatedStocks = stocks.filter(stock => stock.Instrument !== Instrument);

    // Log the updated stocks for debugging
    console.log("Updated Stocks after removal:", updatedStocks);

    // Update the state with the new list of stocks to remove the row from the UI
    setStocks(updatedStocks);

    // Clear any data associated with the stock in the context (if needed)
    updateStock(Instrument, { quantity: 0, LTP: null, Avgvalue: null, currentvalue: null, PandL: null });

    // Optionally log further details or perform any additional cleanup
    console.log(`Stock with instrument ${Instrument} has been completely removed.`);
        }else {
            const updatedStock = {
                ...newexistingstock,
                quantity: remainingQuantity.toString(),
                currentvalue: (newexistingstock.Avgvalue * remainingQuantity).toFixed(2),
                PandL: ((fluctuate - newexistingstock.Avgvalue) * remainingQuantity).toFixed(2)
            };

            const updatedStocks = stocks.map(stock =>
                stock.Instrument === Instrument ? updatedStock : stock
            );
            setStocks(updatedStocks);
            updateStock(Instrument, updatedStock);
            toggleplayvideo2();
        }
    }
};

const handlesellbutton=()=>{
  handleSellClick();
  
}



  
  
  
  
  
  

useEffect(() => {
    return () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
    };
}, [intervalId]);

  

  const handleBackButtonClick = () => {
    toggleModal();
    setDisplayValue('');
  };

  const handleBackButtonClickSell = () =>{
    toggleSell();
    
  }

  const navigate = useNavigate();
  return (
    <div>
      {/*                                                                                                  CHANGE*/}
      <img alt='zomato-groww-logo' src={require('./Groww_logo.png')} className='zomato-groww-logo'></img>
      <img alt='zomato-logo' src={require('./stocks_media/HDFC_logo.png')} className='zomato-logo'></img>
      <h2 className='zomato-heading-name'><b>HDFC Bank</b></h2>
      <h2 className='overviewzomato'>Overview</h2>
      <div className='greenlinezomato1'></div>
      <p className='performancezomato'>Performance</p>
      <p className='monthlowzomato'>Today's Low</p>
      <p className='monthhighzomato'>Today's High</p>
      <div className='greenlinezomato2'></div>
      <p className='Wlowzomato'>52W Low</p>
      <p className='WHighzomato'>52W High</p>
      <div className='greenlinezomato3'></div>
      <p className='openzomato'>Open</p>
      <p className='prevzomato'>Prev. Close</p>
      <p className='Volumezomato'>Volume</p>
      <p className='TTVzomato'>Total traded value</p>
      <p className='uppercircuitzomato'>Upper Circuit</p>
      <p className='lowercircuitzomato'>Lower Circuit</p>
      <p className='analystzomato'>Analyst Estimates</p>
      <div className='circlezomato'></div>
      <p className='analystpercent'>50%</p>
      <p className='buyanalystzomato'>Buy</p>
      <div className='greenlinezomato4'></div>
      <p className='buyanalystzomato84'>50%</p>
      <p className='holdanalystzomato'>Hold</p>
      <div className='greenlinetatasteelhold'></div>
      <p className='holdanalysttatasteel'>29%</p>
      <p className='sellanalystzomato'>Sell</p>
      <p className='aggregatedzomato'>Aggregated by Refinitiv from 42 Analysis</p>
      <div className='greenlinetatasteelsell'></div>
      <p className='sellanalysttatatseel'>20%</p>
      <p className='fundamentalszomato'>Fundamentals</p>
      <p className='marketcapzomato'>Market Cap</p>
      <p className='PEratiozomato'>P/E Ratio(TTM)</p>
      <p className='PBratiozomato'>P/B Ratio</p>
      <p className='industryzomato'>Industry P/E</p>
      <p className='depttoequityzomato'>Debt to Equity</p>
      <p className='marketcapvaluezomato'>₹12,24,817Cr</p>
      <p className='PEratiovaluezomato'>17.97</p>
      <p className='PBratiovaluezomato'>2.59</p>
      <p className='industryvaluezomato'>13.47</p>
      <p className='depttoequityvaluezomato'>NA</p>
      <p className='roezomato'>ROE</p>
      <p className='epszomato'>EPS(TTM)</p>
      <p className='dividendzomato'>Dividend Yield</p>
      <p className='bookvaluezomato'>Book Value</p>
      <p className='facevaluezomato'>Face Value</p>
      <p className='roevaluezomato'>14.47%</p>
      <p className='epsvaluezomato'>89.49</p>
      <p className='dividendvaluezomato'>1.21%</p>
      <p className='bookvaluevaluezomato'>160.64</p>
      <p className='facevaluevaluezomato'>1</p>
      <p className='aboutzomato'>About HDFC Bank</p>
      <p className='aboutzomatovalue'>
      State Bank of India is an India-based banking and financial services provider. 
      The Company is engaged in providing a wide range of <br></br>products and services to individuals, 
      commercial enterprises, corporates, public bodies and institutional customers. The Company's 
      <br></br>segments include Treasury, Corporate/Wholesale Banking, Retail Banking, Insurance Business and 
      Other Banking Business. The Treasury <br></br>segment includes investment portfolio and trading in foreign 
      exchange contracts and derivative contracts. The Corporate/Wholesale <br></br>Banking segment comprises the 
      lending activities of corporate accounts group, commercial clients group and stressed assets resolution
      <br></br>group. These include providing loans and transaction services to corporate and institutional clients and
        further include non-treasury <br></br>operations of foreign offices/entities. The Retail Banking Segment
         is engaged in personal banking activities including lending activities to <br></br>corporate customers
        having banking relations with its branches.
      </p>
      <p className='parentorgzomato'>Parent Organisation</p>
      <p className='parentorgvaluezomato'>HDFC Bank</p>
      <p className='managingdirectorzomato'>Managing Director</p>
      <p className='managingdirectorvaluezomato'>Mr. Sashindhar Jagdishan</p>
      <p className='nsesymbolzomato'>NSE Symbol</p>
      <p className='nsesymbolvaluezomato'>HDFCBANK</p>
      <p className='homelinkzomato' onClick={() => navigate("/home")}> Home</p>
      <p className='cheronlinkzomato'> &gt;</p>
      <p className='zomatolinkzomato' onClick={() => navigate("/hdfc")}> HDFC Bank</p>
      <p className='latestpricezomato'>
        ₹{fluctuate.toFixed(2)}
      </p>
      <p className='monthlowvaluezomato'>1,603.20</p>
      <p className='monthhighvaluezomato'>1,613.70</p>
      <p className='Wlowvaluezomato'>1,363.55</p>
      <p className='Whighvaluezomato'>1,794.00</p>
      <p className='openvaluezomato'>1,606.50</p>
      <p className='prevvaluezomato'>1,607.80</p>
      <p className='volumevaluezomato'>1,61,67,214</p>
      <p className='TTVvaluezomato'>2,599 Cr</p>
      <p className='lowercircuitvaluezomato'>1,447.05</p>
      <p className='uppercircuitvaluezomato'>1,768.55</p>

      <button className='buynowbuttonzomato' onClick={toggleModal}>Buy now</button>
      <button className='sellnowbuttonzomato' onClick={toggleSell} >Sell now</button>

      {modal && (
        <div className='modal123'>
          <div className='overlay'></div>
          <div className='whitescreenbg'>
            <div className='modal-content1'>
              <div className='gobackmodalzomato' onClick={handleBackButtonClick}>
                <button className='backbuttonmodalzomato'>Back</button>
              </div>
              <img src={require('./stocks_media/HDFC_logo.png')} className='logopngmodalzomato' alt='zomatologomodal' />
              {/*                                                                                          CHANGE*/}
              <p className='companystockmodalzomato'>HDFC</p>
              <p className='regularmodalzomato'>Regular</p>
              <div className='greenlinemodal'></div>
              <p className='quantitymodalzomato'>Quantity</p>
              <p className='pricemodalzomato'>Price</p>
              <input
                type='text'
                className='quantityinputmodalzomato'
                onChange={handleInputChange}
                value={quantity}
              />
              <input
                type='text'
                className='priceinputmodalzomato'
                value={fluctuate.toFixed(2)}
                readOnly
              />


              

              {playvideo &&(
                <div className='playvideobody' >
              {/*                                                                                          CHANGE*/}
                    
                  <div className='paymentdetailszomato'>BOUGHT {quantity} x HDFC at price {stockcontext.find(stock => stock.Instrument === Instrument).Avgvalue}</div>
                  <button className='backbuttonvideozomato'  onClick={toggleplayvideo}>Back</button>
                  <div className='mainvideo' >
                        <video src={TickVideo} autoPlay loop muted className='mainvideo'>
                          
                            Error
                        </video>
                        
                  </div>
                </div>
              )}


              <button className='calculatemodalzomato' onClick={handleCalculateClick}>Calculate</button>
              <p className='finalamountmodalzomato'>Final amount : </p>
              {displayValue && <p className='calculatevaluemodalzomato'>₹{displayValue}</p>}
              {error && <p className='error-message'>{error}</p>} {/* Display error message */}
              
              <button className='buynowmodalzomato' onClick={handleBuyClick}>Buy now</button>
            </div>
          </div>
        </div>
      )}

{sellmodal && (
        <div className='modal123'>
          <div className='overlay'></div>
          <div className='whitescreenbg'>
            <div className='modal-content1'>
              <div className='gobackmodalzomato' onClick={handleBackButtonClickSell}>
                <button className='backbuttonmodalzomatosell'>Back</button>
              </div>
              <img src={require('./stocks_media/HDFC_logo.png')} className='logopngmodalzomato' alt='zomatologomodal' />
              <p className='companystockmodalzomato'>HDFC</p>
              <p className='regularmodalzomato'>Regular</p>
              <div className='greenlinemodal'></div>
              <p className='quantitymodalzomato'>Quantity</p>
              <p className='pricemodalzomato'>Price</p>
              <input
                type='text'
                className='quantityinputmodalzomato'
                onChange={handleInputChange}
                value={quantity}
              />
              <input
                type='text'
                className='priceinputmodalzomato'
                value={fluctuate.toFixed(2)}
                readOnly
              />

{playvideo2 &&(
                <div className='playvideobody' >
              {/*                                                                                          CHANGE*/}
                    
                  <div className='paymentdetailszomato'>SOLD {quantity} x HDFC at price {stockcontext.find(stock => stock.Instrument === Instrument).Avgvalue}</div>
                  <button className='backbuttonvideozomato'  onClick={toggleplayvideo2}>Back</button>
                  <div className='mainvideo' >
                        <video src={TickVideo2} autoPlay loop muted className='mainvideo'>
                          
                            Error
                        </video>
                        
                  </div>
                </div>
              )}
              <button className='calculatemodalzomato' onClick={handleCalculateClick}>Calculate</button>
              <p className='finalamountmodalzomato'>Final amount : </p>
              {displayValue && <p className='calculatevaluemodalzomato'>₹{displayValue}</p>}
              {error && <p className='error-message'>{error}</p>} {/* Display error message */}
              
              <button className='buynowmodalzomatosell' onClick={handlesellbutton}>Sell now</button>
            </div>

          </div>
          
        </div>
      )}

      

      <p className='wallettrial'>WALLET: ₹{wallet.toFixed(2)}</p>
      <p className='Dashboardzomato' onClick={()=>navigate('/DashboardGroww')} >DASHBOARD</p>
      <p className='depositzomato' onClick={()=>navigate('/Deposit')} >DEPOSIT</p>

              {/*                                                                                          CHANGE*/}
      <div className='footerzomato'>
      <h4 className='footerteam' >OUR TEAM MEMBERS</h4>
          <h4 className='footermanish' >Manish Ghanshani</h4>
          <h4  className='footersumit'>Sumit Kesarwani</h4>
          <h4  className='footermahima'>Mahima Maurya</h4>
          <h4  className='footerharsh'>Harsh Bhosale</h4>
      </div>
      <iframe
        src={`http://127.0.0.1:5000/hdfcchart?period=${period}`}
        width="600"
        className='zomato-graph'
        height="400"
        title="Zomato Stock Price Ch art"
        style={{ border: 'none' }}                                 
      ></iframe>
      

      
      <button className='one-month' onClick={() => handleClick('1mo')}>1M</button>
      <button className='one-year' onClick={() => handleClick('1y')}>1Y</button>
      <button className='five-year' onClick={() => handleClick('5y')}>5Y</button>
      <button className='max' onClick={() => handleClick('max')}>All</button>

    </div>
  )
}

export default HDFC