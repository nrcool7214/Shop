import React from 'react';
import '../styles/Item.scss';

const Item = ({ properties, addToCart, isOutOfStock, disabledButton }) => {
    // properties passed to create each card
    const { _id, name, picture, price } = properties;


    console.log('ITEM RENDERING...')

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
                    <button className="active-button" onClick={(e) => { e.preventDefault(); addToCart(e, { _id }); isOutOfStock(e, { _id }); }} disabled={disabledButton}>{disabledButton ? 'OUT OF STOCK' : 'ADD TO CART'}</button>
                </div>
            </div>
        </div>
    )
};

export default Item;