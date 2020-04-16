import React, { useState ,useEffect} from 'react'
import {ContextTotal} from "./Context"



export default function Container(props) {

    const [total, setTotal] = useState(null)
    // console.log('TOTAL: ', total); 
    const [cart, setCart] = useState(null);
    // console.log('CART ITEMS: ', cart);
    const [disabledButton, setDisabledButton] = useState(false);
    //sunglasses
    const [sunGlasses, setSunGlasses]=useState(null)



    async function getdb() {
        try {
          let DB = await fetch('/getdb');
          console.log(DB);
          let DBFinal = await DB.json();
          console.log('DBFinal: ', DBFinal);
          setCart(DBFinal.Cart);
          setTotal(DBFinal.Cart.reduce((acc, el) => acc += el.itemAddedPrice * el.itemAddedQuantity, 0).toFixed(2));
          setSunGlasses(DBFinal.Products)
     /*      console.log(sunGlasses, cart ,total) */
        } catch (err) {
          console.log('ERROR!!: ', err);
        }
      };
    
      useEffect(() => {
        getdb()
        /* console.log(sunGlasses, cart,setCart ,setTotal ,total,disabledButton, setDisabledButton) */
      },[]);

    return (
        <ContextTotal.Provider value={{sunGlasses, cart,setCart ,setTotal ,total,disabledButton, setDisabledButton}}>
                {props.children}
        </ContextTotal.Provider>
    )
}
