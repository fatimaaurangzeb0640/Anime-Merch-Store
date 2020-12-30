import React, { Component } from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';



class Signup extends Component {
  state = { username: '', email:'', password1: '', password2:'',  
            submittedUsername: '', submittedEmail: '', submittedPassword1: '', submittedPassword2: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { username, email, password1, password2 } = this.state
    this.setState({ submittedUsername: username,
                    submittedEmail: email, 
                    submittedPassword1: password1,
                    submittedPassword2: password2 })
    
    console.log(username, email, password1, password2);

    this.props.onAuth(username, email, password1, password2);
    this.props.history.push('/'); 

  }
  componentDidMount(){
    
  }
  render() {
    //const { username, password, submittedUsername, submittedPassword} = this.state
    const { username, email, password1, password2,  
            submittedUsername, submittedEmail, 
            submittedPassword1, submittedPassword2} = this.state

    return (
      <div id='signup-form'>
        <Form  size='big' onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              //label='Username'
              className='form-item'
              placeholder='Username'
              name='username'
              value={username}
              onChange={this.handleChange}
            />
            </Form.Group>
            <Form.Group>
            <Form.Input
              //label='Email'
              className='form-item'
              placeholder='Email'
              name='email'
              value={email}
              onChange={this.handleChange}
            />
            </Form.Group>
            <Form.Group>
            <Form.Input
              //label='Password'
              //style={{width:'500px'}}
              className='form-item'
              placeholder='Password'
              name='password1'
              type='password'
              value={password1}
              onChange={this.handleChange}
            />
            </Form.Group>
            <Form.Group>
            <Form.Input
              //label='Confirm Password'
              className='form-item'
              placeholder='Confirm password'
              name='password2'
              type='password'
              value={password2}
              onChange={this.handleChange}
            />
            
          </Form.Group>
          <Button id='signup-form-button'>Signup</Button>
          
        </Form>
        <Button id='signup-back-button' onClick={this.props.handlePropsSignup}>
            <Icon styel = {{}}name='arrow circle left'></Icon>
        </Button>
      </div>
    )
  }
}

//export default Signup;

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
/*
<strong>onChange:</strong>
        <pre>{JSON.stringify({ username, email, password1, password2  }, null, 2)}</pre>
        <strong>onSubmit:</strong>
        <pre>{JSON.stringify({ submittedUsername, submittedEmail, 
                               submittedPassword1, submittedPassword2 }, 
                               null, 2)}</pre>
*/
