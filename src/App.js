import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoginForm from './components/login-form/login-form'
import CreateAccountForm from './components/create-account-form/create-account-form'
import './App.css';

import logo from './img/nyt-logo-379x64.svg'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      signupForm: false,
    }

  }

  static propTypes = {
    login: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }),
  }

  showSignup = (e) => {
    e.stopPropagation()
    e.preventDefault()
    
    if( this.state.signupForm === false ) {
      this.setState({ signupForm: true })
    } else {
      this.setState({ signupForm: false })
    }
    
  }

  render() {

    const {
      login: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props

    return (
      <div className="App">
          <Grid fluid={ true } className="content-wrapper">
            <Row>
              <Col lg={2} md={2} sm={1}>
              </Col>
              <Col lg={8} md={8} sm={10} className="border-bottom">
                <div className="innerBox textLeft">
                  <img src={ logo } alt={ logo } id="nytimesLogo" ref="nytimes-logo" />
                </div>
              </Col>
              <Col lg={2} md={2} sm={1}>
              </Col>
            </Row>
            <Row>
              <Col lg={2} md={2} sm={1}>
              </Col>
              <Col lg={8} md={8} sm={10}>
                <div className="innerBox">

                { /* conditional rendering of the sign up or log in form  */ }
                {!requesting && !successful && !this.state.signupForm && (
                  <div>
                  <h2>Log In</h2>
                  <p>Don't have an account? <a href="" onClick={ this.showSignup }>Create one <span className="sub">&rsaquo;&rsaquo;</span></a></p>
                  </div>
                )}
                {!requesting && !successful && this.state.signupForm && (
                  <div>
                  <h2>Create Your Account</h2>
                  <p>Already have an account? <a href="" onClick={ this.showSignup }>Log in <span className="sub">&rsaquo;&rsaquo;</span></a></p>
                  </div>
                )}

                  <div className="smedia-container">
                    <Button bsStyle="large" className="smedia facebook-blue border-box">Log In with Facebook<span className="facebook-icon"></span></Button>
                    <Button bsStyle="large" className="smedia google-blue border-box">Log In with Google<span className="google-icon"></span></Button>
                  </div>
                  <div className="wordSplit">OR</div>

                { /* conditional rendering of the sign up or log in form  */ }
                {!requesting && !successful && !this.state.signupForm && (
                  <LoginForm />
                )}
                {!requesting && !successful && this.state.signupForm && (
                    <CreateAccountForm />
                )}
                
                </div>
              </Col>
              <Col lg={2} md={2} sm={1}>
              </Col>
            </Row>
            <Row>
              <Col lg={2} md={2} sm={1}>
              </Col>
              <Col lg={8} md={8} sm={10} className="border-top">
                <div className="footer innerBox textCenter">
                  <p>© {(new Date()).getFullYear()} The New York Times Company</p>
                  <ul>
                    <li>
                      <a>Help
                      </a>
                    </li>
                    <li>
                      <a>Feedback
                      </a>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg={2} md={2} sm={1}>
              </Col>
            </Row>
          </Grid>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login,
})

const connected = connect( mapStateToProps )( App )

export default connected