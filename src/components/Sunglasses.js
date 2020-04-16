import React, { useContext } from 'react';
import { ContextTotal } from './Context';
import '../styles/Sunglasses.scss';
import { Route } from 'react-router-dom';
import Item from './Item';
import MiniCart from './MiniCart';


const Sunglasses = () => {

    /*     const { sunGlasses } = useContext(ContextSunglasses);
        console.log(sunGlasses)
        // context variables
        const { setTotal } = useContext(ContextTotal);
    
        const { cart, setCart } = useContext(ContextCart);
        // console.log(cart);
    
        const { setDisabledButton } = useContext(ContextStock); */

    const { sunGlasses, setTotal, cart, setCart, setDisabledButton ,disabledButton,} = useContext(ContextTotal)
    const addToCart = (e, item) => {
        e.preventDefault();
        const data = item;
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
                const response = res1.cart;
                console.log('RESPONSE FROM SERVER:', response);
                let newTotal = response.reduce((acc, el) => acc += el.itemAddedPrice * el.itemAddedQuantity, 0).toFixed(2);
                setTotal(newTotal);
                setCart(response);
            })
    };

    const isOutOfStock = (e, itemId) => {
        e.preventDefault();
         const itemAddedIndex = cart.findIndex(el => el.itemAddedId === itemId._id);
          cart[itemAddedIndex].itemAddedStock <= 1 && setDisabledButton(true);
    };

    const allSunglasses = sunGlasses && sunGlasses.map((el, i) => <Item key={el.name} properties={sunGlasses[i]} addToCart={addToCart} isOutOfStock={isOutOfStock} />);


    console.log('SUNGLASSES RENDERING...')

    return (

        <div className="sunglasses-bk">
            <MiniCart />
            <section className="section-sunglasses">
                {
                    allSunglasses
                }
            </section>
            <Route path="/" />
        </div>

    );
}

export default Sunglasses;

