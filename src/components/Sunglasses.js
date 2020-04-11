import React, { useContext } from 'react';
import { ContextSunglasses } from './Context';
import '../styles/Sunglasses.scss';
import { Route } from 'react-router-dom';
import Item from './Item';
import MiniCart from './MiniCart';


const Sunglasses = () => {

    const sunglasses = useContext(ContextSunglasses);

    const allSunglasses = sunglasses.map((el, i) => <Item key={el.name} properties={sunglasses[i]} />);


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

