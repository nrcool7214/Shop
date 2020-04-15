import React, { useState } from 'react';
import { ContextTotal, ContextCart, ContextStock } from './Context';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import '../styles/App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import Glasses from './Glasses';
import Sunglasses from './Sunglasses';
import Cart from './Cart';
import DB from '../db.json';

const App = () => {

  const [total, setTotal] = useState(DB.Cart.reduce((acc, el) => acc += el.itemAddedPrice * el.itemAddedQuantity, 0).toFixed(2));
  // console.log('TOTAL: ', total);

  const [cart, setCart] = useState(DB.Cart);
  // console.log('CART ITEMS: ', cart);
  const [disabledButton, setDisabledButton] = useState(false);

  console.log('APP RENDERING...')

  return (
    <ContextTotal.Provider value={{ total, setTotal }}>
      <ContextCart.Provider value={{ cart, setCart }}>
        <ContextStock.Provider value={{ disabledButton, setDisabledButton }}>
          <BrowserRouter>
            <div className="app">
              <header className="header">
                <Link to="/"><h1 className="logo-blue">Mr <FontAwesomeIcon style={{ transform: `rotate(-90deg)`, marginRight: '-0.4rem' }} icon={faGlasses} />rilli</h1></Link>
              </header>
              <main>
                <div className="dividing-box">
                  <div className="glasses">
                    <Link className="link-to-section" to="/glasses">
                      <div className="circle circle-view">
                        <h2>GLASSES</h2>
                      </div>
                    </Link>
                  </div>
                  <div className="sunglasses">
                    <Link className="link-to-section" to="/sunglasses">
                      <div className="light"></div>
                      <div className="circle circle-sun">
                        <h2>SUNGLASSES</h2>
                      </div>
                    </Link>
                  </div>
                </div>
              </main>
            </div>
            <Switch>
              <Route path="/glasses">
                <Glasses />
              </Route>
              <Route path="/sunglasses">
                <Sunglasses />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
            </Switch>
          </BrowserRouter>
        </ContextStock.Provider>
      </ContextCart.Provider>
    </ContextTotal.Provider>
  );
}


export default App;