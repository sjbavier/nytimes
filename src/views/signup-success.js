import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


class SignupSuccess extends Component {

   static propTypes = {
      signup: PropTypes.shape({
          username: PropTypes.string,
          password: PropTypes.string,
      }),
   }
 
   render(){

      const {
         signup: {
           username,
           password,
         },
       } = this.props

      return (
            <div><h2>Signup Successful</h2>
                <br />
                <p>Username: { username }</p>
                <p>Password: { password }</p>
            </div>
      )
   }
}

const mapStateToProps = state => ({
    signup: state.signup
})

const connected = connect( mapStateToProps )( SignupSuccess )

export default connected