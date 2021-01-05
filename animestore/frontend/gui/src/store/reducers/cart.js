//import { CommentActions } from "semantic-ui-react";
import { CART_START, CART_SUCCESS, CART_FAIL } from "../actions/actionTypes";
import { updateObject } from "../utility";


const initialState = {
  cartItems: [],
  //itemCount: false,
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
    //itemCount: action.itemCount,
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

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_START:
      return cartStart(state, action);
    case CART_SUCCESS:
      return cartSuccess(state, action);
    case CART_FAIL:
      return cartFail(state, action);
    default:
      return state;
  }
};

export default authReducer;