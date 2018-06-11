import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


class LoginSuccess extends Component {

   static propTypes = {
      login: PropTypes.shape({
          username: PropTypes.string,
          password: PropTypes.string,
      }),
   }
 
   render(){

      const {
         login: {
           username,
           password,
         },
       } = this.props

      return (
            <div><h2>Login Successful</h2>
                <br />
                <p>Username: { username }</p>
                <p>Password: { password }</p>
            </div>
      )
   }
}

const mapStateToProps = state => ({
    login: state.login
})

const connected = connect( mapStateToProps )( LoginSuccess )

export default connected