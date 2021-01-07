import { CART_START, CART_SUCCESS, CART_FAIL, CART_CLEAR } from "./actionTypes";
import { authAxios } from "../../utils";
import { orderSummaryURL } from "../../constants";

export const cartStart = () => {
  return {
    type: CART_START
  };
};

export const cartSuccess = (data) => {
  return {
    type: CART_SUCCESS,
    data: data,
  };
};

export const cartFail = error => {
  return {
    type: CART_FAIL,
    error: error
  }; 
};

export const cartClear = () =>{
  return {
    type: CART_CLEAR
  };
};

export const fetchCart = () => {
  return dispatch => {
    dispatch(cartStart());
    authAxios
      .get(orderSummaryURL)
      .then(json => {
        console.log(json.data);
        dispatch(cartSuccess(json.data));
      })
      .catch(err => {
        dispatch(cartFail(err));
      });
  };
};



/*export const fetchCart = () => {
  return dispatch => {
    dispatch(cartStart());
    authAxios
      .get(orderSummaryURL)
      .then(res => {
        console.log(res.data);
        //dispatch(cartSuccess(res.data));
      })
      .catch(err => {
        dispatch(cartFail(err));
      });
  };
};*/
