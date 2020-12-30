import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/cart';
import { List, Image, Button, Label, Icon } from 'semantic-ui-react'

class Cart extends React.Component {
    componentDidMount(){
        //let cartItems = this.props.fetchCart();
        //console.log(this.props.fetchCart());
        this.props.refreshCart();
       // console.log('Cart items are:'+this.props.cartItems);
        //this.props.refreshCart();
    }

    cartItemUpdate = (op) =>{
      console.log(op);
    }
  
    render() {
      
        return (
  <div>
    { this.props.cartItems? 
    <List divided relaxed>
            {this.props.cartItems.map(c => {
            return (
                <List.Item key={c.id}>
                  <Image src={c.item.image} size='mini' />
                  <List.Content>
                    <List.Header as='a'>{c.item.title}</List.Header>
                    <List.Description as='a'>{c.item.price} PKR</List.Description>
                    <Label>
                      <Icon name='cart' /> 1
                    </Label>
                  </List.Content>
                  <Button.Group>
                    <Button positive size='mini' onClick={()=>{this.cartItemUpdate('+')}}>+</Button>
                    <Button.Or text='' />
                    <Button  size='mini' onClick={()=>{this.cartItemUpdate('-')}}>-</Button>
                  </Button.Group>
                  <Button>
                    <Icon name='trash'></Icon>
                  </Button>
                </List.Item>
            );
          })}
    </List>
          :<h1>No items</h1>
          
        }
            </div>      )
    }
         }

const mapStateToProps = (state) => {
  console.log(state.cart.cartItems);
    return {
              //cartItems: console.log(state.cart.shoppingCart)
              cartItems: state.cart.cartItems,
              loading: state.cart.loading,
              error: state.cart.error
              
          };
        };
                
  const mapDispatchToProps = dispatch => {
                  
    return {
              refreshCart: () => dispatch(actions.fetchCart())
            }
          }
                
  export default connect(mapStateToProps, mapDispatchToProps)(Cart);
//export default Cart;
/*
 {this.props.cartItems.map(item => {
      <div>
      <h1>{item.user}</h1>
      <h1>{item.item}</h1>
      <h1>{item.qty}</h1>

      </div>
      })}*/