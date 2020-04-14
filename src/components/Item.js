import React, { useContext } from 'react';
import { ContextTotal, ContextCart } from './Context';
import '../styles/Item.scss';

const Item = ({ properties }) => {
    // properties passed to create each card
    const { _id, name, picture, price } = properties;

    // context variables
    const { total, setTotal } = useContext(ContextTotal);

    const { cart, setCart } = useContext(ContextCart);
    // console.log(cart);

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
        fetch('http://localhost:4000/addtocart', options)
            .then(res => res.json())
            .then(res1 => {
                const response = res1.status;
                console.log('RESPONSE FROM SERVER:', response);
                let newTotal = response.reduce((acc, el) => acc += el.itemAddedPrice * el.itemAddedQuantity, 0).toFixed(2);
                setTotal(newTotal);
                setCart(response);
            })
    };

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