import React from 'react';
import './App.css';
import Header from './components/header/Header';
import OrderForm from "./components/order-form/OrderForm";
import 'typeface-roboto';

function App() {
  return (
    <div className="App">
      <Header />
      <OrderForm />
    </div>
  );
}

export default App;
