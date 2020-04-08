import React from 'react';
import '../styles/Item.scss';

const Item = ({ properties }) => {

    const { name, picture, price, stock } = properties;
    console.log(properties);

    return (
        <div className="card">
            <h3 className="glasses-name">{name}</h3>
            <img className="glasses-picture" src={picture} alt="" />
            <div className="info">
                <p>{price} €</p>
                <p>{stock} x</p>
            </div>
        </div>
    )
};

export default Item;