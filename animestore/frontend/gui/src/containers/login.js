import React, { Component } from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';
import { NavLink  } from 'react-router-dom';
import Signup from './signup';
import items from './items';
//import loginpage from '../images/loginpage.jpg';



class Login extends Component {
  state = { username: '', password: '', submittedUsername: '', submittedPassword: '', signup:false, login:true }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { username, password } = this.state
    this.setState({ submittedUsername: username, submittedPassword: password })
    this.props.onAuth(username, password);
    console.log(username, password);
    this.props.history.push('/'); 

  }

  handleSignup = () => {
    this.setState({signup:true})
    this.setState({login:false})
  }

  handlePropsSignup = () =>{
    this.setState({signup:false})
    this.setState({login:true})
  }

  render() {
    const { username, password, submittedUsername, submittedPassword, signup, login} = this.state

    return (
    
      <div  id='login-page' 
            style={{  backgroundImage: "url(/img/loginpage.jpg)",
                      }}>
{ login?
      <div id='login-form'>
        <Form size='big' onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input

              className='form-item'
              //label='Username'
              placeholder='Username'
              name='username'
              value={username}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              className='form-item'
              //label='Password'
              placeholder='Password'
              name='password'
              type='password'
              value={password}
              onChange={this.handleChange}
            />
            
          </Form.Group>
          <Button id='login-button'> Login </Button>
        </Form>
<hr id='login-signup-line'></hr>
        <Button id='signup-button' icon labelPosition='right' color='blue' onClick={this.handleSignup}>
          Sign up
          <Icon name='signup' />
        </Button>
        </div>:
        <></>
}  
      
        

       
    {signup?
        <Signup {...this.props} state={this.state} handlePropsSignup={this.handlePropsSignup}></Signup>:
        <></>
  }
      </div>
   
    )
  }
}

const mapStateToProps = (state) => {
  return {
      loading: state.auth.loading,
      error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  
  return {
      onAuth: (username, password) => dispatch(actions.authLogin(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

/*
<strong>onChange:</strong>
        <pre>{JSON.stringify({ username, password }, null, 2)}</pre>
        <strong>onSubmit:</strong>
        <pre>{JSON.stringify({ submittedUsername, submittedPassword }, null, 2)}</pre>
*/