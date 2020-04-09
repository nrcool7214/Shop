import React from 'react';
import '../styles/Item.scss';

const Item = ({ properties }) => {

    const { name, picture, price, stock } = properties;
    console.log(properties);

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
                    <button>ADD</button>
                </div>
            </div>
        </div>
    )
};

export default Item;