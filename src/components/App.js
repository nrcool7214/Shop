import React, { useState } from 'react';
import { ContextTotal } from './Context';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import '../styles/App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import Glasses from './Glasses';
import Sunglasses from './Sunglasses';
import Cart from './Cart';

const App = () => {

  const [total, setTotal] = useState(0);
  console.log('TOTAL: ', total);

  return (
    <ContextTotal.Provider value={{ total, setTotal }}>
      <BrowserRouter>
        <div className="app">
          <header className="header">
            <Link className="to-home" to="/"><h1 className="logo-blue">Mr <FontAwesomeIcon style={{ transform: `rotate(-90deg)`, marginRight: '-0.4rem' }} icon={faGlasses} />rilli</h1></Link>
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
    </ContextTotal.Provider>
  );
}


export default App;