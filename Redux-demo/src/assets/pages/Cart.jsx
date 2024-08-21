import React from "react";
import CartItem from "../../components/CartItem";
import { useSelector } from "react-redux";
import {
  getCartError,
  getCartItems,
  getCartLoadingState,
} from "../../store/slices/cartSlice";
import NoCart from "../../components/NoCart";

export default function Cart() {
  // const cartItems = [
  //   {
  //     id: 1,
  //     title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  //     imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  //     quantity: 1,
  //     rating: 3.9,
  //     price: 109.95,
  //   },
  //   {
  //     id: 2,
  //     title: 'Mens Cotton Jacket',
  //     imageUrl: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
  //     quantity: 1,
  //     rating: 4.7,
  //     price: 55.99,
  //   },
  //   {
  //     id: 3,
  //     title: 'Mens Casual Slim Fit',
  //     imageUrl: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
  //     quantity: 1,
  //     rating: 2.1,
  //     price: 15.99,
  //   },
  // ]
  const cartItems = useSelector(getCartItems);

  // console.log("cartitems", cartItems);
  const isLoading = useSelector(getCartLoadingState);
  const error = useSelector(getCartError);
  // console.log(isLoading)

  return cartItems.length === 0 ? (
    <h1 style={{textAlign:"center"}}>your cart is empty</h1>
  ) : (
    <div className="cart-container">
      <h2>Items in Your Cart</h2>
      <div className="cart-items-container">
        <div className="cart-header cart-item-container">
          <div className="cart-item">Item</div>
          <div className="item-price">Price</div>
          <div className="quantity">Quantity</div>
          <div className="total">Total</div>
        </div>
        {isLoading ? (
          <h1 style={{ textAlign: "center" }}>Loading...</h1>
        ) : error ? (
          <h2 style={{ textAlign: "center" }}>{error}</h2>
        ) : (
          cartItems.map(({ id, title, rating, price, image, quantity }) => (
            <CartItem
              key={id}
              productId={id}
              title={title}
              price={price}
              quantity={quantity}
              imageUrl={image}
              rating={rating.rate}
            />
          ))
        )}
        <div className="cart-header cart-item-container">
          <div></div>
          <div></div>
          <div></div>
          {!isLoading && !error && (
            <div className="total">
              $
              {cartItems
                .reduce(
                  (accumulator, currentItem) =>
                    accumulator + currentItem.quantity * currentItem.price,
                  0
                )
                .toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
