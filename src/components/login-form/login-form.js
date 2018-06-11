import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import loginRequest from './actions'


class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showPassword: false,
            passInputType: "password",
            passToggleText: "Show Password",
        }

        this.togglePassword = this.togglePassword.bind(this)
    }


    static propTypes = {
        handleSubmit: PropTypes.func,
        loginRequest: PropTypes.func,
        login: PropTypes.shape({
          requesting: PropTypes.bool,
          successful: PropTypes.bool,
          messages: PropTypes.array,
          errors: PropTypes.array,
        }),
      }

    
     togglePassword = ( e ) => {
        e.preventDefault()
        e.stopPropagation()

        if( this.state.showPassword === false ){ this.setState({ showPassword: true, passInputType: "text", passToggleText: "Hide Password" }) }
        else { this.setState({ showPassword: false, passInputType: "password", passToggleText: "Show Password" }) }
    }
    // Values will be an object with `username` and `password`
    submit = ( values ) => {
        this.props.loginRequest( values )
    }


    render(){
        const {
            handleSubmit,
            login: {
              requesting,
              successful,
              messages,
              errors,
            },
        } = this.props
      
        return (
            
                <form id="loginForm" onSubmit={ handleSubmit( this.submit.bind(this) ) }>
                    <div className="loginInput form-group">
                        <Field
                            name="username"
                            type="text"
                            id="loginUser"
                            className="form-control"
                            placeholder="Username"
                            component="input"
                        />
                        <Field
                            name="password"
                            type={ this.state.passInputType }
                            id="loginPassword"
                            className="form-control"
                            placeholder="Password"
                            component="input"
                        />
                        <a className="show-password" onClick={ this.togglePassword }>{ this.state.passToggleText }</a>
                        <div className="checkbox-container">
                                <div className="checkbox-wrapper">
                                    <Field
                                        name="rememberMe"
                                        type="checkbox"
                                        id="rememberMe"
                                        className=""
                                        component="input"
                                        checked={true}
                                    />
                                    <label className="checkbox-label">Remember me</label>
                                </div>
                            <a className="forgot-password" href="">Forgot your password?</a>
                        </div>
                        <button action="submit" type="submit" className="lrg-btn submit ">Log In</button>
                    </div>
                </form>


        )
    }
}



const mapStateToProps = state => ({
   login: state.login,
})

const connected = connect( mapStateToProps, { loginRequest } )( LoginForm )

const formed = reduxForm({
   form: 'login',
})( connected )

export default formed