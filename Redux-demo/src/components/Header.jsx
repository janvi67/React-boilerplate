import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "../react-redux";
import { RiHeart3Fill } from "react-icons/ri";

export default function Header() {
  const cartItems = useSelector((state) => state.cartItems);

  const wishList = useSelector((state) => state.wishList);

  const totalWishlistItems = wishList.reduce(
    (accumulator, currentItem) => accumulator + currentItem.quantity,
    0
  );

  const totalCartItems = cartItems.reduce(
    (accumulator, currentItem) => accumulator + currentItem.quantity,
    0
  );

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
