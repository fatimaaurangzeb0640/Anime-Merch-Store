import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './routes';
import './App.css';
import * as actions from './store/actions/auth';
import 'semantic-ui-css/semantic.min.css';
import CustomLayout from './containers/layout';
import history from "./history.js";
import './containers/stylesheet.css';


class App extends Component {

  componentDidMount() {
  
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div className='main-app-div'>
        <Router>
          <CustomLayout {...this.props}>
          </CustomLayout>
        </Router>
      </div>
    );
  }
}

//This is sending a state
const mapStateToProps = state => {
  //console.log(state.auth.token);
  return {
    isAuthenticated: state.auth.token !== null
  }
}

//This checking the state of the user is still authenticated
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);