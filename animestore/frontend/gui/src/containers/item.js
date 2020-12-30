import React from 'react';
import axios from 'axios';
import { Item } from 'semantic-ui-react';


class SingeItem extends React.Component {
  state = {
      item: {}
  };

  fetchItem = (productID) => {
      axios.get(`http://127.0.0.1:8000/api/${productID}`)
          .then(res => {
              this.setState({
                  item: res.data
              });
              console.log(res.data);
          });
  }

  componentDidMount() {
      const productID = this.props.match.params.productID;
      console.log(productID);
      this.fetchItem(productID);
  }

  render() {
    const items = [
      {
        childKey: 0,
        image: this.state.item.image,
        header: this.state.item.title,
        description: this.state.item.description,
        meta: this.state.item.category,
        extra: 'Extra',
      },
    ]
    
    return (

 <Item.Group items={items} />
    )
  }
}
export default SingeItem;




