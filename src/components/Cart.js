import React, { useContext } from 'react';
import '../styles/Cart.scss';
import { ContextCart, ContextTotal } from './Context';

const Cart = () => {

    const { cart, setCart } = useContext(ContextCart);
    const { total, setTotal } = useContext(ContextTotal);

    const itemsInCart = cart.map((el, i) => {
        return (
            <li className="item-in-cart" key={i}>
                <p>{el.itemAddedName}</p>
                <p className="underscore"></p>
                <p>{el.itemAddedPrice.toFixed(2)}€</p>
            </li>
        )
    })

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
