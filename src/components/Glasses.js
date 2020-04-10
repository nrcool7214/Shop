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
            <MiniCart />
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
