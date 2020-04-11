import React, { useContext, useEffect } from 'react';
import '../styles/Cart.scss';
import { ContextCart, ContextTotal } from './Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {

    const { cart, setCart } = useContext(ContextCart);
    const { total, setTotal } = useContext(ContextTotal);

    const removeItem = (item) => {
        // console.log('IM PASSING THIS: ', item);

        let itemId = cart.find(el => (el.itemAddedId === item.itemAddedId)).itemAddedId;
        console.log('ITEM_ID: ', itemId);

        setCart(cart.filter(el => el.itemAddedId !== item.itemAddedId));
        setTotal(total - item.itemAddedPrice.toFixed(2));

        const options = {
            method: 'DELETE',
            body: itemId
        };

        fetch(`/remove/${itemId}`, options)
            .then(res => res.json())
            .then(res1 => {
                const response = res1.status;
                // console.log('RESPONSE FROM SERVER:', response);
                let newTotal = response.reduce((acc, el) => acc += el.itemAddedPrice, 0).toFixed(2);
                setTotal(newTotal);
                setCart(response);
            })
    };

    const removeAllItems = () => {

        const options = {
            method: 'DELETE'
        };

        fetch('/removeall', options)
            .then(res => res.json())
            .then(res1 => {
                const response = res1.status;
                console.log('RESPONSE FROM SERVER:', response);
                let newTotal = response.reduce((acc, el) => acc += el.itemAddedPrice, 0).toFixed(2);
                setTotal(newTotal);
                setCart(response);
            })
    };

    const itemsInCart = cart.map((el, i) => {
        return (
            <li className="item-in-cart" key={i}>
                <p>{el.itemAddedName}</p>
                <p className="underscore"></p>
                <p>{el.itemAddedPrice.toFixed(2)}€ <FontAwesomeIcon className="remove-item" icon={faTimes} onClick={() => removeItem(el)} /></p>
            </li>
        )
    });

    return (
        <div className="cart-bk">
            <section className="section-cart">
                <h4>Overview:</h4>
                <div className="overview">
                    <ul>
                        <li className="titles-cart">
                            <p>Product</p>
                            <p>Price</p>
                        </li>
                        {
                            itemsInCart
                        }
                        <li className="titles-cart total-cart">
                            <button className="active-button" onClick={removeAllItems}>REMOVE ALL</button>
                        </li>
                        <li className="titles-cart total-cart">
                            <p>Total: {total}€</p>
                        </li>
                    </ul>
                </div>
                <h4>Delivery address:</h4>
                <form>
                    <label htmlFor="first-name" className="first-name">
                        <input type="text" id="first-name" name="first-name" placeholder="Name" />
                    </label>
                    <label htmlFor="second-name" className="second-name">
                        <input type="text" id="second-name" name="second-name" placeholder="Surname" />
                    </label>
                    <label htmlFor="address" className="address">
                        <input type="text" id="address" name="address" placeholder="Address" />
                    </label>
                    <label htmlFor="" className="address-nr">
                        <input type="number" id="address-nr" name="address-nr" placeholder="Number" />
                    </label>
                    <label htmlFor="" className="address-post">
                        <input type="number" id="address-post" name="address-post" placeholder="Post number" />
                    </label>
                    <label htmlFor="" className="submit-btn">
                        <input type="submit" value="PAY" id="submit-btn" className="active-button" />
                    </label>

                </form>
            </section>
        </div>
    );
}

export default Cart;
