import React, { createContext,useContext,useEffect,useState } from 'react'
import { fetchDataFormApi, postdata } from '../utility/Api';
import { useAlert } from './AlertBox';


export const CartContext = createContext();
export const CartProvider = ({children}) => {
  const [cartItem, setCartItem]= useState()
    const { showAlert } = useAlert();

    const AddtoCart = (data)=> {
      // console.log(data, "products")
         postdata(`/api/cart/add`, data).then((res)=>{
          if (!res.error) {
            showAlert('Item added to cart successfully!', false, 3000);
            // setTimeout(() => {
            //     window.location.href ="/shopping-cart"
            // },3100);
          } else {
            showAlert("This Product are Already Added in the Cart", true, 3000);
          }
          fetchDataFormApi(`/api/cart`).then((res) => {
            setCartItem(res.length);
          })
         })
    }

     
  return (
    <CartContext.Provider 
      value={{
        AddtoCart,
        cartItem, 
        setCartItem
       }}>
           {children}
    </CartContext.Provider>
  )
}
