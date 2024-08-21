import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
const findItemIndex = (state, action) =>
  state.findIndex(
    (cartItem) => cartItem.productId === action.payload.productId
  );

// const slice = createSlice({
//   name: "cart",
//   initialState: [],
//   reducers: {
//     addCartItem(state, action) {
//       const existingItemIndex = findItemIndex(state, action);
//       if (existingItemIndex !== -1) state[existingItemIndex].quantity += 1;
//       else state.push({ ...action.payload, quantity: 1 });
//     },
//     removeCartItem(state, action) {
//       const existingItemIndex = findItemIndex(state, action);
//       state.splice(existingItemIndex, 1);
//     },
//     increaseCartItemQuantity(state, action) {
//       const existingItemIndex = findItemIndex(state, action);
//       state[existingItemIndex].quantity += 1;
//     },
//     decreaseCartItemQuantity(state, action) {
//       const existingItemIndex = findItemIndex(state, action);
//       state[existingItemIndex].quantity -= 1;
//       if (state[existingItemIndex].quantity <= 0) {
//         state.splice(existingItemIndex, 1);
//       }
//     },
//   },
// });

// function myCreateSlice(config) {
//   const { name, initialState, reducers } = config
//   const actions = {}

//   Object.keys(reducers).forEach((key) => {
//     actions[key] = function (payload) {
//       return {
//         type: `${name}/${key}`,
//         payload,
//       }
//     }
//   })

//   function reducer(originalState = initialState, action) {
//     return produce(originalState, (state) => {
//       const caseReducer = reducers[action.type.split('/')[1]]
//       if (caseReducer) return caseReducer(state, action)
//       return state
//     })
//   }
//   return { actions, reducer }
// }
const slice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
  reducers: {
    fetchCartItems(state) {
      state.loading = true;
    },
    fetchCartItemsError(state, action) {
      state.loading = false;
      state.error = action.payload || "Something went wrong!";
    },
    loadCartItems(state, action) {
      state.loading = false;
      // console.log('action.payload',action.payload.products )
      state.list = action.payload.products;
    },
    addCartItem(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      if (existingItemIndex !== -1) {
        state.loading = false;
        state.list[existingItemIndex].quantity += 1;
      } else {
        state.loading = false;
        state.list.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCartItem(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      state.list.splice(existingItemIndex, 1);
    },
    increaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      state.list[existingItemIndex].quantity += 1;
    },
    decreaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      state.list[existingItemIndex].quantity -= 1;
      if (state.list[existingItemIndex].quantity === 0)
        state.list.splice(existingItemIndex, 1);
    },
  },
});
export const getCartItems = ({ products, cartItems }) => {
  return cartItems.list
    .map(({ productId, quantity }) => {
      const cartProduct = products.list.find(
        (product) => product.id === productId
      );
      // console.log("cartProduct",cartProduct)
      return { ...cartProduct, quantity };
    })
    .filter(({ title }) => title);
};
// export const getAllCartItems=createSelector(getCartItems,(state)=>state)
export const getCartLoadingState = (state) => state.cartItems.loading;
export const getCartError = (state) => state.cartItems.error;

export const {
 
  addCartItem,
  removeCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} = slice.actions;
// console.log("slice", slice);
// console.log("action", slice.actions.addCartItem());
export default slice.reducer;
