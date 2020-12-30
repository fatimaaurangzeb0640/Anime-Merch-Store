import React from 'react'
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import { NavLink  } from 'react-router-dom';
import { authAxios } from "../utils";
import { addToCartURL } from "../constants";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import * as actionsCart from '../store/actions/cart';
import * as actionsAuth from '../store/actions/auth';



class ItemList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
      addToCart : []
  }
  this.handleAddToCart = this.handleAddToCart.bind(this)
}
  
componentDidMount(){
  //console.log(this.props.items);
  this.props.onTryAutoSignup();
  this.props.refreshCart();
  console.log(this.props.loading);
  console.log('the user is authenticated:'+this.props.isAuthenticated)
  console.log(this.props.cartItems);
  console.log('items component mounted');
  console.log(this.state.items);
  let addToCart = [...this.state.addToCart]
  for (let i=0; i<this.state.items.length; i++)
  {
    let atc = {... addToCart[i]};
    atc = true;
    addToCart[i] = atc;
    console.log(addToCart[i]);
  }
  console.log(addToCart)
  
    //this.setState({addToCart:addToCart})
    //console.log(this.state.addToCart);
    this.handleCartItems(addToCart);
    
}
  //CartItems() here handles which product's add to cart's button should be disabled already
    handleCartItems(addToCart){
      this.props.refreshCart();
      console.log(this.props.cartItems);
      console.log(this.state.addToCart);
      if (this.props.cartItems !== undefined)
      
      {//let addToCart = [...this.state.addToCart]
      console.log(addToCart);
         for(let i=0; i<this.props.cartItems.length; i++){
           //console.log(this.props.cartItems[i].item.title);
          for(let j=0; j<this.state.items.length; j++){
            //console.log(this.state.items[j].title);
          if (this.props.cartItems[i].item.title === this.state.items[j].title)
          {
            console.log("inside");
            console.log(this.props.cartItems[i].item.title + '=' + this.state.items[j].title)
            let atc = {... addToCart[j]};
            atc = false;
            addToCart[j] = atc;
            console.log(j + ':'+ addToCart[j]);
            console.log(addToCart);
          }
          }
        }
        console.log(addToCart);
        this.setState({addToCart:addToCart});
        console.log(this.state.addToCart);

      }
      else{
        console.log('no');
      }

    }
  handleAddToCart(e) {
    console.log(e.target);
    console.log(this.state.addToCart);
    const slug = e.target.dataset.slug;
    const index = e.target.dataset.index;
    //setTimeout(() => {
      console.log(slug);
      console.log(index);

    //this.setState({ loading: true });
    authAxios
      .post(addToCartURL, { slug })
      .then(res => {
        console.log("added to cart");
        let addToCart = [...this.state.addToCart]
    let atc = {... addToCart[index]}
    atc = false;
    addToCart[index] = atc;
    this.setState({addToCart:addToCart});
    console.log(this.state.addToCart);
        //this.props.refreshCart();
        //this.setState({ loading: false });
      })

      //.catch(err => {
       // this.setState({ addToCart:false });
     // });
  //}, 1500)
        //this.setState({addToCart:false});
    
    console.log('hi');
  };
  render() {
    const {items, addToCart} = this.state
      return (
        
          <div>
            
            {items.length!==0? 
            <div>
            <h1>Items List</h1>


          <Item.Group divided>
          {items.map(item => {
          return (
          <Item key={item.id}>
          <Item.Image src={item.image} />
          <Item.Content>
          <NavLink to={
            '/items/'+item.slug
          //item.get_absolute_url
          }>
            <Item.Header
              as="a"
            >
              {item.title}
            </Item.Header>
            </NavLink>
            <Item.Meta>
              <span className="cinema">{item.category}</span>
            </Item.Meta>
            <Item.Description>{item.description}</Item.Description>
            <Item.Extra>
           {  
            addToCart[items.indexOf(item)] ?
              <Button primary floated='right' 
                      data-slug={item.slug}
                      data-index={items.indexOf(item)}
                    onClick={this.handleAddToCart}
              >
                Add to cart
                <Icon name='shopping cart' />
              </Button>:
              <Button floated='right' disabled color='black'>
          Added to cart
          <Icon name='shopping cart' />
          </Button>
            
          }
              <Label>Limited</Label>
            </Item.Extra>
          </Item.Content>
          </Item>
          );
          })}
          </Item.Group>
          </div>
          :<h1>No items</h1>}
                        
                
                    </div> )
            }
                }


const mapStateToProps = (state) => {
  console.log(state.cart.cartItems);
    return {
            //cartItems: console.log(state.cart.shoppingCart)
            cartItems: state.cart.cartItems,
            loading: state.cart.loading,
            error: state.cart.error,
            isAuthenticated: state.auth.token !== null
          };
        };
                      
const mapDispatchToProps = dispatch => {
return {
        refreshCart: () => dispatch(actionsCart.fetchCart()),
        onTryAutoSignup: () => dispatch(actionsAuth.authCheckState())
      }
    }
export default connect(mapStateToProps, mapDispatchToProps)(ItemList);

 