import React, { useEffect, useState, useContext } from 'react';
import html2canvas from 'html2canvas'
import { StockContext } from './Stockcontext.js';
import './DashboardGroww.css';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const { stocks, updateStock } = useContext(StockContext);
  const [totalInvestment, setTotalInvestment] = useState(0.00);
  const [totalCurrentValue, setTotalCurrentValue] = useState(0.00);
  const [totalPandL, setTotalPandL] = useState(0.00);
 
  const currenttime = format(new Date(), 'dd:MM:yy-HH:mm:ss');
  console.log(currenttime)


  //DOWNLOAD BUTTON
  const DownloadScreenshot =()=>[
    html2canvas(document.body).then(function(canvas){
      var a = document.createElement('a');
      a.href = canvas.toDataURL().replace("image/jpeg")
      a.download = `GrowwDashboard_${currenttime}.jpg`;
      a.click();

    })
  ]

  
  
  // Function to calculate the total investment
  const calculateTotalInvestment = () => {
    return stocks.reduce((total, stock) => {
      const avgValue = Number(stock.Avgvalue);
      const quantity = Number(stock.quantity);
      return total + (avgValue * quantity);
    }, 0);
  };

  // Function to calculate the total current value
  const calculateTotalCurrentValue = () => {
    return stocks.reduce((total, stock) => {
      const currentLTP = Number(stock.LTP);
      const quantity = Number(stock.quantity);
      return total + (currentLTP * quantity);
    }, 0);
  };

  // Function to calculate the total P&L
  const calculateTotalPandL = () => {
    return stocks.reduce((total, stock) => {
      const avgValue = Number(stock.Avgvalue);
      const currentLTP = Number(stock.LTP);
      const quantity = Number(stock.quantity);
      return total + ((currentLTP - avgValue) * quantity);
    }, 0);
  };

  useEffect(() => {
    // Set interval for updating stocks
    const newIntervalId = setInterval(() => {
      stocks.forEach(stock => {
        const currentLTP = Number(stock.LTP);
        if (isNaN(currentLTP)) {
          console.error('Invalid LTP value:', stock.LTP);
          return;
        }

        const fluctuation = Math.random() > 0.5 ? 0.50 : -0.50;
        const updatedLTP = currentLTP + fluctuation;
        const updatedCurrentValue = stock.quantity * updatedLTP;
        const updatedPandL = (updatedLTP - Number(stock.Avgvalue)) * stock.quantity;

        updateStock(stock.Instrument, {
          LTP: updatedLTP.toFixed(2),
          currentvalue: updatedCurrentValue.toFixed(2),
          PandL: updatedPandL.toFixed(2),
        });
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(newIntervalId);
  }, [stocks, updateStock]);

  useEffect(() => {
    // Update the total investment, current value, and P&L whenever the stocks array changes
    setTotalInvestment(calculateTotalInvestment());
    setTotalCurrentValue(calculateTotalCurrentValue());
    setTotalPandL(calculateTotalPandL());
  }, [stocks]);

  
const navigate = useNavigate();
  return (
    <div >
      <p className='holdings'>Holdings</p>
      <hr  className='line' ></hr>
      <p className='totalinvestment'>Total investment</p>
      <p className='totalinvestmentvalue'>{totalInvestment.toFixed(2)}</p>
      <p className='currentvalue'>Current value</p>
      <p className='currentvaluevalue'>{totalCurrentValue.toFixed(2)}</p>
      <p className='pandl'>Total P&L</p>
      <p className='pandlvalue'  style={{ color: totalPandL > 0 ? 'green' : 'red' }}>{totalPandL.toFixed(2)}</p>

      {/*DOWNLOAD BUTTON*/}

      <button type='button' className='downloadbutton' onClick={DownloadScreenshot} >DOWNLOAD</button>
      <button type='button' className='backbutton' onClick={()=>{navigate(-1)}}>BACK</button>
      
      <div className='finaltable'>
        <table className='theadtable'>
          <thead className='thead'>
            <tr>
              <th className='instru'>Instrument</th>
              <th className='quantity'>Quantity</th>
              <th className='avg'>Avg. Price</th>
              <th className='curr'>Curr. Value</th>
              <th className='ltp'>LTP</th>
              <th className='pl'>P&L</th>
            </tr>
          </thead>
        </table>
        <div className='scrollmain'>
          <table className='table'>
            <tbody>
              {stocks.map(stock => (
                <tr key={stock.Instrument}>
                  <td>{stock.Instrument}</td>
                  <td>{stock.quantity}</td>
                  <td>{stock.Avgvalue}</td>
                  <td>{(stock.quantity * stock.LTP).toFixed(2)}</td>
                  <td>{stock.LTP}</td>
                  
                  <td style={{ color: (stock.LTP - stock.Avgvalue) * stock.quantity > 0 ? 'green' : 'red' }}>
                    {((stock.LTP - stock.Avgvalue) * stock.quantity).toFixed(2)}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;