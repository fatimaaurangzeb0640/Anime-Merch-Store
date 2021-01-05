import React from 'react';
import homepage from '../images/homepage.jpg';
import axios from 'axios';
import { Button, Container } from 'semantic-ui-react'
import { NavLink  } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionsAuth from '../store/actions/auth';
import * as actionsCart from '../store/actions/cart';



class Home extends React.Component {
    componentDidMount(){
        this.props.onTryAutoSignup();
       // this.props.refreshCart();
    }
    render() {
        return (
            <div>
                <div id='home-main-div'>
                    <h1 id='home-main-heading'>Anime merch for all the Pakistani weebs out there.</h1>
                    <p id='home-main-para'>
                        Buy badges, lockets, keychains, posters and so much more
                        of your favourite characters at very exciting prices. 
                        We give you the chance of buying anime stuff from the 
                        comfort of your home.
                    </p>
                    <Button id='buy-now-main' color='orange'>
                        Buy now
                    </Button>
                    <Button id='explore-first-main' color='blue'>
                        Explore first
                    </Button>
                </div>
                <div id='home-img-div'>
                    <img id='home-img' src={homepage} alt='Home page'/>
                </div>
            </div>
        )
    }
}
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
       //refreshCart: () => dispatch(actionsCart.fetchCart()),
       onTryAutoSignup: () => dispatch(actionsAuth.authCheckState())
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Home);
//export default Home;