import './App.css';
import Home from './Components/Home';
import Login from './Pages/Login';
import Signup from './Components/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Zomato from './Components/Zomato';
import Tatasteel from './Components/Tatasteel';
import { WalletProvider } from './Components/Universalwallet';
import { StockProvider } from './Components/Stockcontext';
import DashboardGroww from './Components/DashboardGroww';
import Deposit from './Components/Deposit';
import HDFC from './Components/HDFC';
import SBI from './Components/SBI';
import TCS from './Components/TCS';
import Transaction from './Components/Transaction'
import Otpgen from './Components/otpgen';
import Appointment from './Components/Appointment';

function App() {
  return (
  <StockProvider>
<WalletProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Zomato" element={<Zomato />} />
          <Route path="/Tatasteel" element={<Tatasteel />} />
          <Route path="/HDFC" element={<HDFC />} />
          <Route path="/SBI" element={<SBI />} />
          <Route path="/TCS" element={<TCS />} />
          <Route path="/DashboardGroww" element={<DashboardGroww />} />
          <Route path="/Deposit" element={<Deposit />} />
          <Route path="/Transaction" element={<Transaction />} />
          <Route path="/otpgen" element={<Otpgen />} />
          <Route path="/appointment" element={<Appointment />} />
        </Routes>
      </div>
    </Router>
    </WalletProvider>
  </StockProvider>
    
  );
}

export default App;
