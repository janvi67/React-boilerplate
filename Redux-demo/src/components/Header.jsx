import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RiHeart3Fill } from "react-icons/ri";
import {
  fetchProductItemData,

} from "../store/slices/productSlice";

export default function Header() {
  const dispatch = useDispatch();
  useEffect(() => {
    //     dispatch(
    // fetchData({
    //   url: "products",
    //   onStart: fetchProducts.type,
    //   onSuccess: updateAllProducts.type,
    //   onError: fetchProductsError.type,
    // })

    //     );
    dispatch(fetchProductItemData())
    // dispatch(fetchProducts())
    // fetch('https://fakestoreapi.com/products').then((res)=>res.json().then((data)=>{
    //   // console.log("product data",data)
    //   dispatch(updateAllProducts(data))

    // })).catch(()=>{
    //   dispatch(fetchProductsError())
    // })
    // dispatch(fetchCartItems())
    //  fetch('https://fakestoreapi.com/carts/5').then((res)=>res.json()).then((data)=>{
    //   console.log("cartproduct",data)
    //   // dispatch(loadCartItems(data))
    //  }).catch(()=>{
    //   dispatch((fetchCartItemsError()))
    // })
  }, []);

  const cartItems = useSelector((state) => state.cartItems.list);

  const wishList = useSelector((state) => state.wishList);

  const totalWishlistItems = wishList.reduce(
    (accumulator, currentItem) => accumulator + currentItem.quantity,
    0
  );

  const totalCartItems = cartItems.reduce(
    (accumulator, currentItem) => accumulator + currentItem.quantity,
    0
  );

  //   console.log("cartitems",cartItems)
  // console.log("totalcart",totalCartItems)
  return (
    <header>
      <div className="header-contents">
        <h1>
          <Link to={"/"}>Shope</Link>
        </h1>

        <Link className="cart-icon" to="/cart">
          <div className="cart-items-count">{totalCartItems}</div>
          <FaShoppingCart />
        </Link>

        <Link className="cart-icon" to="/wishlist">
          <div className="cart-items-count">{totalWishlistItems}</div>
          <RiHeart3Fill />
        </Link>
      </div>
    </header>
  );
}
