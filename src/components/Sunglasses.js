import React, { useState } from 'react';
import '../styles/Sunglasses.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import { Link, Route } from 'react-router-dom';
import Item from './Item';
import db from '../db.json';

const Glasses = () => {

    const [sunglasses, setSunglasses] = useState(db.Sunglasses);

    const allSunglasses = sunglasses.map((el, i) => <Item key={el._id} properties={sunglasses[i]} />)

    return (

        <div className="sunglasses-bk">
            <header className="header">
                <Link className="to-home" to="/"><h1 className="logo-blue">Mr <FontAwesomeIcon style={{ transform: `rotate(-90deg)`, marginRight: '-0.4rem', filter: 'drop-shadow(-1px 2px 0px rgb(41, 40, 0))' }} icon={faGlasses} />rilli</h1></Link>
            </header>
            <section className="section-sunglasses">
                {
                    allSunglasses
                }
            </section>
            <Route path="/" />
        </div>

    );
}

export default Glasses;

