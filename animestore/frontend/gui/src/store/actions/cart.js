import { CART_START, CART_SUCCESS, CART_FAIL } from "./actionTypes";
import { authAxios } from "../../utils";
import { orderSummaryURL } from "../../constants";

export const cartStart = () => {
  return {
    type: CART_START
  };
};

export const cartSuccess = (data, itemCount) => {
  return {
    type: CART_SUCCESS,
    data: data,
    //itemCount: itemCount
  };
};

export const cartFail = error => {
  return {
    type: CART_FAIL,
    error: error
  }; 
};

export const fetchCart = () => {
  return dispatch => {
    dispatch(cartStart());
    authAxios
      .get(orderSummaryURL)
      .then(json => {
        console.log(json.data);
       /* var data = json.data;
        console.log('length:'+ Object.keys(data).length);
        if(Object.keys(data).length === 0){
          console.log('no items');
          dispatch(cartSuccess(json.data));
          localStorage.setItem('cartItemsCount',0);
        }
        else{
          console.log('itemsss');
          dispatch(cartSuccess(json.data));
          localStorage.setItem('cartItemsCount',1);
        }*/
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
