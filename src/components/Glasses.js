import React, { useState } from 'react';
import '../styles/Glasses.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import { Link, Route } from 'react-router-dom';
import Item from './Item';
import db from '../db.json';

const Glasses = () => {

    const [glasses, setGlasses] = useState(db.Glasses);
    console.log(glasses);
    const allGlasses = glasses.map((el, i) => <Item key={el._id} properties={glasses[i]} />)

    return (

        <div className="glasses-bk">
            <header className="header">
                <Link className="to-home" to="/"><h1 className="color-red">Mr <FontAwesomeIcon style={{ transform: `rotate(-90deg)`, marginRight: '-0.4rem', filter: 'drop-shadow(-1px 2px 0px rgb(41, 40, 0))' }} icon={faGlasses} />rilli</h1></Link>
            </header>
            <section className="section-glasses">
                {
                    allGlasses
                }
            </section>
            <Route path="/" />
        </div>

    );
}

export default Glasses;
