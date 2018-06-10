import React from 'react'
import PropTypes from 'prop-types'

// iterate over messages and print them in ul

const Messages = (props) => {
   const { messages } = props
   return (
      <div>
         <ul>
            {messages.map(message => (
               <li key={message.time}>{message.body}</li>
            ))}
         </ul>
      </div>
   )
}

Messages.propTypes = {
   messages: PropTypes.arrayOf(
      PropTypes.shape({
         body: PropTypes.string,
         time: PropTypes.date,
      })
   ),
}

export default Messages