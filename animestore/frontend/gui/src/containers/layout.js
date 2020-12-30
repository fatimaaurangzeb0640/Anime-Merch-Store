/*import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect, Router } from 'react-router';
import history from "../history.js";
import { NavLink, withRouter } from 'react-router-dom';
import * as actions from '../store/actions/auth';
//import BaseRouter from '../routes';


class CustomLayout extends Component {
  state = { activeItem: 'home',
  options : [
    { key: 1, text: 'User Profile', value: 1 },
    { key: 2, text: 'Cart', value: 2 },
    { key: 3, text: 'Logout', value: 3 },
  ] }
  

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    if (name==='home'){
      this.props.history.push('/');}

    else{
      this.props.history.push(`/${name}/`)
    }
      
  }
  
  componentDidMount() {
    setTimeout(function() {
      console.log(localStorage.getItem('token'));
  }, 1000);
    let pathname =  window.location.pathname;
    if(pathname === '/'){
      this.setState({ activeItem: 'home' })
      this.props.history.push('/');}
    
    else{ 
    let activeItem = pathname.substring(1, pathname.length - 1)
    this.setState({ activeItem })
    this.props.history.push(pathname);
  }
}


  render() {
    const { activeItem } = this.state
    const options = [
      { key: 1, text: 'User Profile', value: 1 },
      { key: 2, text: 'Cart', value: 2 },
      { key: 3, text: 'Logout', value: 3 },
    ] 
    return (
      <div>
        <Menu pointing>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='discover'
            active={activeItem === 'discover'}
            onClick={this.handleItemClick}
          />
                  {
            this.props.isAuthenticated ?
            <Menu.Item
              name='cart'
              active={activeItem === 'cart'}
              onClick={this.handleItemClick}
            />

                                :  
                  <></>
                  } 

          {
            this.props.isAuthenticated ===false?
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={this.handleItemClick}
          /> :
          <h1></h1>       
                        }
                </Menu>
          
          {
            this.props.isAuthenticated ?
          <Menu.Menu position='right'>
          <Menu compact>
              <Dropdown text='Dropdown' options={options} simple item />
          </Menu>
          </Menu.Menu>
          :
            <></>

          }

          
        

        <div>
            {this.props.children}
        </div>
          
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
      logout: () => dispatch(actions.logout())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));
*/
import React, { Component } from 'react';
import { Icon, Menu, Dropdown } from 'semantic-ui-react';
//import './stylesheet.css';
import { connect } from 'react-redux';
import BaseRouter from '../routes';
import { Redirect, Router } from 'react-router';
import history from "../history.js";
import { NavLink, withRouter } from 'react-router-dom';
import * as actionsAuth from '../store/actions/auth';
import * as actionsCart from '../store/actions/cart';
//import BaseRouter from '../routes';

class CustomLayout extends Component {
  state = { activeItem: 'gamepad' }
  
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    if (name==='home'){
      this.props.history.push('/');}

    else{
      this.props.history.push(`/${name}/`)
    }
      
  }
  
  componentDidMount() {
    console.log(this.props);
    setTimeout(function() {
      console.log(localStorage.getItem('token'));
  }, 1000);
    let pathname =  window.location.pathname;
    if(pathname === '/'){
      this.setState({ activeItem: 'home' })
      this.props.history.push('/');}
    
    else{ 
    let activeItem = pathname.substring(1, pathname.length - 1)
    this.setState({ activeItem })
    this.props.history.push(pathname);
  }
}
handleLogout=()=>{
this.props.logout();
this.props.refreshCart();
console.log(this.props.cartItems);
this.props.history.push('/');
}
  //handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
    <div>
      
      <Menu size='huge' icon='labeled'>
      <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
      >
      <Icon name='home'/>
      Home
      </Menu.Item>

      <Menu.Item
        name='discover'
        active={activeItem === 'discover'}
        onClick={this.handleItemClick}
      >
      <Icon name='find'/>
      Discover
      </Menu.Item>
                  

          {
            this.props.isAuthenticated ===false?
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={this.handleItemClick}
          >
          <Icon name='user'></Icon>
          Login
          </Menu.Item>
             :
          <></>       
                        }

{
      this.props.isAuthenticated ?
        <Menu.Menu id="dropdown" position='right'>
          <Dropdown item text="Fatima's account" >
            <Dropdown.Menu>
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item>
              <NavLink to='/cart/'>
              <Dropdown.Item id='cart-dropdown'>
                  Cart              
              </Dropdown.Item>
              </NavLink>
              </Dropdown.Item>
              <Dropdown.Item
              /*onClick={()=>{this.props.logout;
                            window.location.href='/';
                          }}*/ 
              onClick={this.handleLogout}
              >Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      :<></>
  }
      </Menu>
    <div>
      {/*this.props.children*/} 
    </div>
    <BaseRouter {...this.props}/>
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
const mapDispatchToProps = dispatch => {
  return {
    
    refreshCart: () => dispatch(actionsCart.fetchCart()),
      logout: () => dispatch(actionsAuth.logout())
      
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLayout));
