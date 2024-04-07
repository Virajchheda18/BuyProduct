import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import './App.css';
import PlaceOrder from "./place-order/PlaceOrder";

function App() {
  return (
    <Router>
      <Routes >
        <Route path="/" element={<PlaceOrder />} />
      </Routes >
    </Router>
  );
}

export default App;
