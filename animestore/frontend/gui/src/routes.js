import React from "react";
import { Route, Switch } from "react-router-dom";
import Category from "./containers/category";
import Home from "./containers/home";
import AboutUs from "./containers/aboutus";
import ItemList from "./containers/items";
import SingleItem from "./containers/item";
import history from "./history.js";
import Login from "./containers/login.js";
import Signup from "./containers/signup.js";
import Cart from "./containers/cartDetails.js";
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionsAuth from './store/actions/auth';
import * as actionsCart from './store/actions/cart';




class BaseRouter extends React.Component {

    state = { items: [],
            }
    
    handleItems = (items) => {
       console.log(items);
       this.setState({items: items });
       console.log(this.props);
      /*setTimeout(() => {
       this.props.history.push('/items/');
      }, 2000)*/
      //window.location.href='/items/';
      this.props.history.push('/items/');
      
    }

    componentDidMount (){
          //this.props.onTryAutoSignup();
        //console.log(this.state.items)
        if (this.state.items.length === 0 )
        {
              //console.log(localStorage.getItem('category'));
              //console.log('items are null');
              let category = localStorage.getItem('category');
              axios.get(`http://127.0.0.1:8000/api/?search=${category}`).then(res => {
              //console.log(res.data);
              this.setState({items: res.data });
              
        });
        }
    }


    render() {
         return (
            
        <Switch>
            <Route exact path="/" 
                    //component={Home} 
                    component={() => (<Home {...this.props}/>)}
            />{" "}
            
            <Route  exact path="/discover/" 
                    component={() => (<Category onGetItems={this.handleItems} />)}
            />{" "}
            
            <Route exact path="/aboutus/" component={AboutUs} />{" "}
            
            <Route  exact path="/items/"
                    component={() => (<ItemList items={this.state.items}  />)}
            />{" "}

            <Route exact path="/items/:productID" 
                   component={SingleItem} 
            />{" "}

            <Route exact path="/login/" 
                   component={Login} 
            />{" "}

            <Route exact path="/signup/" 
                   component={Signup} 
            />{" "}

             <Route exact path="/cart/" 
                   component={Cart} 
            />{" "}



        </Switch>
        )
     }
}
export default BaseRouter;

/*const mapStateToProps = state => {
       //console.log(state.auth.token);
       return {
          cartItems: state.cart.cartItems,
          loading: state.cart.loading,
          error: state.cart.error,
          isAuthenticated: state.auth.token !== null
       }
     }
     
     //This checking the state of the user is still authenticated
     const mapDispatchToProps = dispatch => {
       return {
          refreshCart: () => dispatch(actionsCart.fetchCart()),
          onTryAutoSignup: () => dispatch(actionsAuth.authCheckState())
       }
     }
     
export default connect(mapStateToProps, mapDispatchToProps)(BaseRouter);
*/
