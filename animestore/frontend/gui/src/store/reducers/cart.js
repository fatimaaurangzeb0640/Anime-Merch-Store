//import { CommentActions } from "semantic-ui-react";
import { CART_START, CART_SUCCESS, CART_FAIL, CART_CLEAR } from "../actions/actionTypes";
//import { cartClear } from "../actions/cart";
import { updateObject } from "../utility";


const initialState = {
  cartItems: [],
  error: null,
  loading: false
};

const cartStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const cartSuccess = (state, action) => {
  return updateObject(state, {
    cartItems: action.data,
    error: null,
    loading: false
  });
};

const cartFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const cartClear = (state, action) =>{
  //return initialState;
  return updateObject(state, {
    cartItems: [],
    error: null,
    loading: false
  });
}

const authReducer = (state = initialState, action) => {
  //if (localStorage.getItem('token')!==null){
  switch (action.type) {
    case CART_START:
      return cartStart(state, action);
    case CART_SUCCESS:
      return cartSuccess(state, action);
    case CART_FAIL:
      return cartFail(state, action);
    case CART_CLEAR:
      console.log('im called');
      return state = initialState;
    default:
      return state;
  }
//}
  /*else{
    console.log('returning ini state');
    return initialState;
  }*/
};

export default authReducer;