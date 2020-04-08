import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import '../styles/App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlasses } from '@fortawesome/free-solid-svg-icons'

const App = () => {

  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <h1>Mr <FontAwesomeIcon style={{ transform: `rotate(-90deg)`, marginRight: '-0.4rem', filter: 'drop-shadow(-1px 2px 0px rgb(41, 40, 0))' }} icon={faGlasses} />rilli</h1>
        </header>
        <main>
          <div className="dividing-box">
            <div className="glasses">
              <div className="square">
                <h2>GLASSES</h2>
              </div>
            </div>
            <div className="sunglasses">
              <div className="light">
              </div>
              <div className="square square-sun">
                <h2>SUNGLASSES</h2>
              </div>
            </div>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}


export default App;