import React from 'react';
import axios from 'axios';
import { Button, Container } from 'semantic-ui-react'
import { NavLink  } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import * as actionsAuth from '../store/actions/auth';
import * as actionsCart from '../store/actions/cart';


class Category extends React.Component {

    fetchItems = (category) => {
        localStorage.setItem('category', category);
        axios.get(`http://127.0.0.1:8000/api/?search=${category}`).then(res => {
        console.log(res.data);
        this.props.onGetItems(res.data);
        });
        
    }

    componentDidMount(){
        this.props.onTryAutoSignup();
        this.props.refreshCart();
    }
    
    render() {
        return (
            <div id='category-div'>
         
            <Button 
                className='category'
                onClick={() => {this.fetchItems('BG')}} 
                color='yellow' 
                style={{ fontSize: '60px', width:'450px', margin:'30px', borderRadius:'15px' }}
            >
                Badges 
            </Button>
        

         
            <Button 
                className='category'
                onClick={() => {this.fetchItems('PR')}} 
                color='orange' 
                style={{ fontSize: '60px', width:'450px', margin:'30px', borderRadius:'15px' }}
            >
                Posters
            </Button>
        

         
            <Button 
                className='category'
                onClick={() => {this.fetchItems('KC')}} 
                color='green' 
                style={{ fontSize: '60px', width:'450px', margin:'30px', borderRadius:'15px'}}
            >
                Keychains
            </Button>
        

         
            <Button 
                className='category'
                onClick={() => {this.fetchItems('PN')}} 
                color='teal' 
                style={{ fontSize: '60px', width:'450px', margin:'30px', borderRadius:'15px' }}
            >
                Pens
            </Button>
        
          
         
            <Button 
                className='category'
                onClick={() => {this.fetchItems('LK')}} 
                color='blue' 
                style={{ fontSize: '60px', width:'450px', margin:'30px', borderRadius:'15px' }}
            >
                Lockets
            </Button>
        

            </div>


        )
    }
}

//This is sending a state
const mapStateToProps = state => {
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

//export default Category;
export default connect(mapStateToProps, mapDispatchToProps)(Category);