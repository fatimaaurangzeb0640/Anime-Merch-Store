/*import * as actionTypes from './actionTypes';
import axios from 'axios';
import { authAxios } from "../../utils";
import { orderSummaryURL } from "../../constants";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/login/', {
            username: username,
            password: password
        })
            .then(res => {
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
                console.log(localStorage.getItem('token'));

                authAxios
                .get(orderSummaryURL)
                .then(json => {
                    console.log(json.data);
                    var data = json.data;
                    console.log('length:'+ Object.keys(data).length);
                    if(Object.keys(data).length === 0){
                    console.log('no items');
                    localStorage.setItem('cartItemsCount','true'); //true means zero items
                    console.log(localStorage.getItem('cartItemsCount'));
                    }
                    else{
                    console.log('itemsss');
                    localStorage.setItem('cartItemsCount','false'); //false means more than zero items
                    console.log(localStorage.getItem('cartItemsCount'));
                    }
                })
               
                    })
            
            .catch(err => {
                dispatch(authFail(err))
            })

            
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
            .then(res => {
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}
*/


/*import * as actionTypes from './actionTypes';
import axios from 'axios';
import { authAxios } from "../../utils";
import { orderSummaryURL } from "../../constants";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const getCartCount = () => {
    return dispatch => {
        console.log('hifdf')
                authAxios
                .get(orderSummaryURL)
                .then(json => {
                    console.log(json.data);
                    var data = json.data;
                    console.log('length:'+ Object.keys(data).length);
                    if(Object.keys(data).length === 0){
                    console.log('no items');
                    localStorage.setItem('cartItemsCount','true'); //true means zero items
                    console.log(localStorage.getItem('cartItemsCount'));
                    }
                    else{
                    console.log('itemsss');
                    localStorage.setItem('cartItemsCount','false'); //false means more than zero items
                    //localStorage.setItem('refreshCart', 'true');
                    console.log(localStorage.getItem('cartItemsCount'));
                   // console.log(localStorage.getItem('refreshCart'));
                    }
                })
    }

}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/login/', {
            username: username,
            password: password
        })
            .then(res => {
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
               //dispatch(getCartCount());
                console.log(localStorage.getItem('token'));

            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
            .then(res => {
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}
*/

import * as actionTypes from './actionTypes';
import axios from 'axios';
import { authAxios } from "../../utils";
import { orderSummaryURL } from "../../constants";
import {cartClear} from "./cart";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    //console.log('cleared');
    //dispatch(cartClear());
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
        
        
    }
}

export const finalLogout = () =>{
    return dispatch =>{
        dispatch(logout());
        dispatch(cartClear());
        console.log('cart cleared');
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/login/', {
            username: username,
            password: password
        })
            .then(res => {
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
                console.log(localStorage.getItem('token'));
                authAxios
                .get(orderSummaryURL)
                .then(json => {
                    console.log(json.data);
                    var data = json.data;
                    console.log('length:'+ Object.keys(data).length);
                    if(Object.keys(data).length === 0){
                    console.log('no items');
                    localStorage.setItem('cartItemsCount','true'); //true means zero items
                    console.log(localStorage.getItem('cartItemsCount'));
                    }
                    else{
                    console.log('itemsss');
                    localStorage.setItem('cartItemsCount','false'); //false means more than zero items
                    console.log(localStorage.getItem('cartItemsCount'));
                    }
                })
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
            .then(res => {
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}