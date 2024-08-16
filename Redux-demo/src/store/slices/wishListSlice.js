import { produce } from "immer"

// Action Types
const WISHLIST_ADD_ITEM = 'wishList/addItem'
const WISHLIST_REMOVE_ITEM = 'wishList/removeItem'

// Action Creators
export function addWishListItem(wishList) {
  return { type: WISHLIST_ADD_ITEM, payload: wishList  }
}
export function removeWishListItem(productId) {
  return { type: WISHLIST_REMOVE_ITEM, payload: { productId } }
}

// Reducer
export default function wishListReducer(originalState = [], action) {
 return produce(originalState,(state)=>{
  const existingWishlistItem = state.find(
    (item) => item.productId === action.payload.productId
  );

  switch (action.type) {
    case WISHLIST_ADD_ITEM:
      if(state[existingWishlistItem!==-1]){
    state[existingWishlistItem].quantity+=1
    break
      }
      
     state.push({...action.payload,quantity:1})
      break
   
    case WISHLIST_REMOVE_ITEM:
      state.splice(existingWishlistItem,1);
      break
  }
  return state
});

}