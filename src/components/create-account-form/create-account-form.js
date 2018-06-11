import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import signupRequest from './actions'


class CreateAccountForm extends Component {

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
        signupRequest: PropTypes.func,
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
        this.props.signupRequest( values )
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
            
                <form id="CreateAccountForm" onSubmit={ handleSubmit( this.submit.bind(this) ) }>
                    <div className="loginInput form-group">
                        <Field
                            name="username"
                            type="text"
                            id="emailUser"
                            className="form-control"
                            placeholder="Email Address"
                            component="input"
                        />
                        <Field
                            name="password"
                            type={ this.state.passInputType }
                            id="signupPassword"
                            className="form-control"
                            placeholder="Create Password"
                            component="input"
                        />
                        <a className="show-password" onClick={ this.togglePassword }>{ this.state.passToggleText }</a>
                        <div className="checkbox-container">
                                <div className="checkbox-wrapper">
                                    <Field
                                        name="agreement"
                                        type="checkbox"
                                        id="agreement"
                                        className=""
                                        component="input"
                                        checked={true}
                                    />
                                    <label className="checkbox-label">You agree to receive occasional updates and special offers for The New York Times's products and services. You may opt out or contact us anytime.<br /><br />
By creating an account, you agree to the Terms of Service and acknowledge our Privacy Policy.</label>
                                </div>
                        </div>
                        <button action="submit" type="submit" className="lrg-btn submit ">Sign Up</button>
                    </div>
                </form>


        )
    }
}



const mapStateToProps = state => ({
   login: state.login,
})

const connected = connect( mapStateToProps, { signupRequest } )( CreateAccountForm )

const formed = reduxForm({
   form: 'signup',
})( connected )

export default formed