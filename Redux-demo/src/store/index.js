import productsReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import wishListReducer from "./slices/wishListSlice";
import { produce } from "immer";
import { configureStore } from "@reduxjs/toolkit";
import { logger } from "./middleware/logger";
import { apiMiddleware } from "./middleware/api";
import { func } from "./middleware/func";

// function logger(store){
//   return function (next){
//     return function (action){
//       console.log("store",store)
//       console.log("next",next)
//       console.log("action",action)
//       next(action)
//     }
//   }
// }

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cartItems: cartReducer,
    wishList: wishListReducer,
  },
  middleware:(getDefaultMiddleWare)=>[...getDefaultMiddleWare(),func],
});

// console.log(store);

const users = [
  {
    name: "janvi",
    age: 23,
  },
  {
    name: "komal",
    age: 18,
  },
  {
    name: "kaira",
    age: 22,
  },
  {
    name: "kriti",
    age: 20,
  },
];

// const newUser=users.map((user,i)=>{
//   if(i===1){
//     return {...user,age:20}
//   }
// })
// console.log(newUser)
const newUser = produce(users, (usersCopy) => {
  // console.log(usersCopy);
  usersCopy[1].age = 17;
});
// console.log(newUser);
