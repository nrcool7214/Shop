import React, { useState, useContext } from 'react';
import { ContextViewglasses } from './Context';
import '../styles/Glasses.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import { Link, Route } from 'react-router-dom';
import Item from './Item';
import MiniCart from './MiniCart';


const Glasses = () => {

    const glasses = useContext(ContextViewglasses);

    const allGlasses = glasses.map((el, i) => <Item key={el._id} properties={glasses[i]} />);

    return (

        <div className="glasses-bk">
            <header className="header">
                <Link className="to-home" to="/"><h1 className="logo-red">Mr <FontAwesomeIcon style={{ transform: `rotate(-90deg)`, marginRight: '-0.4rem', filter: 'drop-shadow(-1px 2px 0px rgb(41, 40, 0))' }} icon={faGlasses} />rilli</h1></Link>
                <MiniCart />
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
