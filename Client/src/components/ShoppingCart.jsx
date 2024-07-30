import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ShoppingCart.css';
import { deletedata, editdata, fetchDataFormApi } from './utility/Api';
import { UserContext } from './Context Api/UserAuthContext';
import {CartContext} from  './Context Api/ShopContext'

export default function ShoppingCart() {
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();
  const {setAlertBox} = useContext(UserContext);
  const {setCartItem} = useContext(CartContext)

  useEffect(() => {
    fetchDataFormApi(`/api/cart`).then((res) => {
      setCartData(res);
    });
  }, []);

  const handleQuantityChange = (index, value) => {
    const updatedCartData = [...cartData];
    updatedCartData[index].quantity = parseInt(value, 10);
    updatedCartData[index].subTotal = updatedCartData[index].price * updatedCartData[index].quantity;
    setCartData(updatedCartData);
  const updatedItem = updatedCartData[index];
    // console.log(updatedItem._id, "updatedCart")
    editdata(`/api/cart/${updatedItem._id}`,{quantity: updatedItem.quantity,subTotal: updatedItem.subTotal}).then((res)=>{
      fetchDataFormApi(`/api/cart`).then((res) => {
        setCartData(res);
      });
    })
  };

  const minus = (index) => {
    if (cartData[index].quantity > 1) {
      handleQuantityChange(index, cartData[index].quantity - 1);
    }
  };

  const plus = (index) => {
    handleQuantityChange(index, cartData[index].quantity + 1);
  };

  const getCartTotal = () => {
    return cartData.reduce((total, item) => total + item.subTotal, 0);
  };

  const removeItem = (id)=>{
     deletedata(`/api/cart/${id}`).then((res)=>{
       setAlertBox({
        open:true,
        error:false,
        msg:"Item are remove in the Cart"
       });
       fetchDataFormApi(`/api/cart`).then((res) => {
        setCartData(res);
        setCartItem(res.length)
      });
     })
  }

  return (
    <div className="container-fluid">
      <div className="row px-xl-5">
        <div className="col-12">
          <nav className="breadcrumb bg-light mb-30">
            <a className="breadcrumb-item text-dark" href="/">Home</a>
            <a className="breadcrumb-item text-dark" href="/">Shop</a>
            <span className="breadcrumb-item active">Shopping Cart</span>
          </nav>
        </div>
      </div>
      <div className="row px-xl-5">
        <div className="col-lg-8 table-responsive mb-5">
          <table className="table table-light table-borderless table-hover text-center mb-0">
            <thead className="thead-dark">
              <tr>
                <th>Products</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>SubTotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {cartData.map((item, index) => (
                <tr key={index}>
                  <td className="align-middle productName" >
                    <img src={item.images} alt="" />
                    <span className="pl-2 font-weight-bold" onClick={()=> navigate(`/product/detail/${item.productId}`)} >
                      {item.productTitle.substring(0, 20) + '...'}
                    </span>
                  </td>
                  <td className="align-middle font-weight-bold">
                    RS{item.price}
                  </td>
                  <td className="align-middle">
                    <div className="mx-auto" style={{ maxWidth: "100px" }}>
                      <div className="d-flex">
                        <button
                          className="btn btn-sm btn-primary btn-minus"
                          onClick={() => minus(index)}
                        >
                          <i className="fa fa-minus"></i>
                        </button>
                        <input
                          type="text"
                          className="form-control bg-secondary border-0 text-center"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(index, e.target.value)}
                        />
                        <button
                          className="btn btn-sm btn-primary btn-plus"
                          onClick={() => plus(index)}
                        >
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle font-weight-bold">
                    RS{item.subTotal}
                  </td>
                  <td className="align-middle">
                    <button className="btn btn-sm btn-danger" onClick={()=> removeItem(item._id)}>
                      <i className="fa fa-times"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-lg-4">
          <form className="mb-30" action="">
            <div className="input-group">
              <input type="text" className="form-control border-0 p-4" placeholder="Coupon Code" />
              <div className="input-group-append">
                <button className="btn btn-primary">Apply Coupon</button>
              </div>
            </div>
          </form>
          <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Cart Summary</span></h5>
          <div className="bg-light p-30 mb-5">
            <div className="border-bottom pb-2">
              <div className="d-flex justify-content-between mb-3">
                <h6>Subtotal</h6>
                <h6>RS {getCartTotal()}</h6>
              </div>
              <div className="d-flex justify-content-between">
                <h6 className="font-weight-medium">Shipping</h6>
                <h6 className="font-weight-medium">RS 10</h6>
              </div>
            </div>
            <div className="pt-2">
              <div className="d-flex justify-content-between mt-2">
                <h5>Total</h5>
                <h5>RS {getCartTotal() + 10}</h5>
              </div>
              <button className="btn btn-block btn-primary font-weight-bold my-3 py-3 " >
                <Link to="/checkout" className="text-decoration-none" style={{color: "black"}}>Proceed To Checkout</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}