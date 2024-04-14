import React, { useState } from "react";


const cartContext=React.createContext()

const CartProvider=(props)=>{
    const [cartData, setCartData] = useState([]);

  const addToCartData = (item) => {
    const data = { item };
    setCartData([...cartData, data]);
    console.log(item)
  }
  const removeCartData = (item) => {
    const updatedCartData = cartData.filter((cartItem) => cartItem.item !== item);
    setCartData(updatedCartData);
  }
  
    return(
        <cartContext.Provider value={{cartData,addToCartData,removeCartData}}>
           {props.children}
        </cartContext.Provider>
    )

}
export{cartContext,CartProvider}