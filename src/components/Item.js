import React, { useContext, useState, useEffect } from 'react';
import { ContextTotal } from './Context';
import '../styles/Item.scss';

const Item = ({ properties }) => {
    // properties passed to create each card
    const { _id, name, picture, price, stock } = properties;

    // context variable, now stored in const total
    const { total, setTotal } = useContext(ContextTotal);

    const addToCart = (item) => {
        item.preventDefault();
        const data = { _id };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        fetch('/addtocart', options)
            .then(res => res.json())
            .then(res1 => {
                const response = res1.status;
                let newTotal = response.reduce((acc, el) => acc += el.itemAddedPrice, 0).toFixed(2);
                setTotal(newTotal);
            })
    };

    // useEffect(() => console.log('TOTAL: ', total));

    return (
        <div className="card">
            <div className="face-one">
                <div className="title">
                    <h3 className="glasses-name">{name}</h3>
                </div>
                <div className="content">
                    <img className="glasses-picture" src={picture} alt="" />
                </div>
            </div>
            <div className="face-two">
                <div className="info">
                    <p>{price} €</p>
                    <button className="active-button" onClick={addToCart}>ADD TO CART</button>
                </div>
            </div>
        </div>
    )
};

export default Item;