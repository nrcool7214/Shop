import React, { useContext, useState, useEffect } from 'react';
import { ContextTotal } from './Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../styles/MiniCart.scss';


const MiniCart = () => {

    const { total, setTotal } = useContext(ContextTotal);

    console.log('CART: ', total);

    return (
        <div className="minicart">
            <p><FontAwesomeIcon icon={faShoppingCart} /> TOTAL: {total} €</p>
        </div>
    )
};

export default MiniCart;
