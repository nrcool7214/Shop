import React, { useState, useEffect } from 'react';
import { ContextTotal, ContextCart, ContextStock,ContextSunglasses } from './Context';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import '../styles/App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import Glasses from './Glasses';
import Sunglasses from './Sunglasses';
import Cart from './Cart';

const App = () => {


  const [total, setTotal] = useState(null)
  // console.log('TOTAL: ', total);

  const [cart, setCart] = useState(null);
  // console.log('CART ITEMS: ', cart);
  const [disabledButton, setDisabledButton] = useState(false);

  //sunglasses
  const [sunGlasses, setSunGlasses]=useState(null)

  async function getdb() {
    try {
      let DB = await fetch('/getdb');
      console.log(DB);
      let DBFinal = await DB.json();
      console.log('DBFinal: ', DBFinal);
      setCart(DBFinal.Cart);
      setTotal(DBFinal.Cart.reduce((acc, el) => acc += el.itemAddedPrice * el.itemAddedQuantity, 0).toFixed(2));
      setSunGlasses(DBFinal.Products)
      console.log(sunGlasses, cart ,total)
    } catch (err) {
      console.log('ERROR!!: ', err);
    }
  };

  useEffect(() => {
    getdb()
    console.log(sunGlasses, cart ,total)
  }, []);

  return (
    <ContextTotal.Provider value={{ total, setTotal }}>
      <ContextCart.Provider value={{ cart, setCart }}>
        <ContextStock.Provider value={{ disabledButton, setDisabledButton }}>
          <ContextSunglasses.Provider value={{sunGlasses}}> 
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
          </ContextSunglasses.Provider>
        </ContextStock.Provider>
      </ContextCart.Provider>
    </ContextTotal.Provider>
  );
}


export default App;