import React from 'react';
import '../styles/Sunglasses.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import { Link, Route } from 'react-router-dom';

const Sunglasses = () => {
    return (
        <div className="sunglasses-bk">
            <header className="header">
                <Link className="to-home" to="/"><h1 className="color-blue">Mr <FontAwesomeIcon style={{ transform: `rotate(-90deg)`, marginRight: '-0.4rem', filter: 'drop-shadow(-1px 2px 0px rgb(41, 40, 0))' }} icon={faGlasses} />rilli</h1></Link>
            </header>
            <section>

            </section>
            <Route path="/" />
        </div>
    );
}

export default Sunglasses;

