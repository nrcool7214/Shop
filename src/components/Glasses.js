import React, { useContext } from 'react';
import { ContextTotal } from './Context';
import '../styles/Glasses.scss';
import { Route } from 'react-router-dom';
import Item from './Item';
import MiniCart from './MiniCart';


const Glasses = () => {

/*     const glasses = useContext(ContextViewglasses);

    // context variables
    const { setTotal } = useContext(ContextTotal);

    const { cart, setCart } = useContext(ContextCart);
    // console.log(cart);

    const { setDisabledButton } = useContext(ContextStock); */



    const { setTotal,cart, setCart,setDisabledButton, sunGlasses } = useContext(ContextTotal);
    
    
    const addToCart = (e, item) => {
        e.preventDefault();
        console.log('ADD TO CART IS RUNNING');
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

        console.log('CART BEFORE', cart);
    };

    const isOutOfStock = (e, itemId) => {
        e.preventDefault();
        console.log('ISOUTOFSTOCK IS RUNNING');
        console.log(e);
        console.log(itemId._id);
        console.log(cart);
        const itemAddedIndex = cart.findIndex(el => el.itemAddedId === itemId._id);
        cart[itemAddedIndex].itemAddedStock <= 1 && setDisabledButton(true);
};

    const allGlasses =sunGlasses && sunGlasses.map((el, i) => <Item key={el._id} properties={sunGlasses[i]} addToCart={addToCart} isOutOfStock={isOutOfStock} />);


    console.log('GLASSES RENDERING...')

    return (

        <div className="glasses-bk">
            <MiniCart />
            <section className="section-glasses">
                {
                    allGlasses
                }
            </section>
            <Route path="/" />
        </div>

    );
}

export default Glasses;
