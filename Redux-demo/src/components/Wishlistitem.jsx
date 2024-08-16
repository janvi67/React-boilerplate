import React from 'react'
import { useDispatch } from '../react-redux'
import { removeCartItem } from '../store/slices/cartSlice'
import { removeWishListItem } from '../store/slices/wishListSlice'

export default function Wishlistitem({
  productId,
  title,
  rating,
  imageUrl, 
  price,

}) {
  const dispatch = useDispatch()
  return (
    <div className="cart-item-container">
      <div className="cart-item">
        <img src={imageUrl} alt={title} />
        <div>
          <h3>{title}</h3>
          <p>{rating} ★ ★ ★ ★</p>
        </div>
      </div>
      <div className="item-price">${price}</div>
      <div>
      <button onClick={()=>{dispatch(removeWishListItem(productId))}}>Remove</button>
      </div>
     
    </div>
  )
}