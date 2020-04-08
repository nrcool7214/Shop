import React from 'react';
import '../styles/Item.scss';

const Item = ({ properties }) => {

    const { name, picture, price, stock } = properties;
    console.log(properties);

    return (
        <div className="card">
            <h3>{name}</h3>
            <img src={picture} alt="" />
            <p>{price} €</p>
            <p>{stock} x</p>
        </div>
    )
};

export default Item;