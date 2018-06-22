import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import initialData from './initialData.json'

class LoginSuccess extends Component {

    static propTypes = {
        login: PropTypes.shape({
            username: PropTypes.string,
            password: PropTypes.string,
        }),
    }
   
    constructor(props) {
        super(props)
        this.state = {
            creditPool: initialData,       
        }
    }

    componentDidMount() {
        this.retrieveData()
    }

    retrieveData = () => {
        fetch('https://api.jsonbin.io/b/5b130242c2e3344ccd96cb4d')
            .then( response => response.json() )
            .then( data => {
                let counter = 0
                let timedChange = setInterval( () => {
                    counter++
                    if( counter === data.length - 1 ) { clearInterval( timedChange ) }
                    let current = this.state.creditPool
                    let newUtil1 = data[counter].Util1
                    let creditPoolId = data[counter].CreditPool
                    let creditPoolLimit1, WarnPct

                    if( newUtil1 === 0 ){ return }

                    for (var i = 0; i < current.length; i++){
                        if( current[i].CreditPool === creditPoolId ){
                            creditPoolLimit1 = current[i].Limit1
                            WarnPct = current[i].WarnPct
                            break
                        }
                    }

                    data[counter].Limit1 = creditPoolLimit1
                    data[counter].WarnPct = WarnPct

                    current.unshift( data[counter] )
                    this.setState({ creditPool: current })
                }, 3000 )
            })
    }   

   render(){
        const creditPoolItems = this.state.creditPool.map(( data, i ) => {

            let combinedClasses, baseClass = "creditPoolItem"
            let pctUt = ( ( data.Util1 / data.Limit1 ) * 100 )
            let bar = { height: pctUt + "%" }

            if ( data.Util1 >= data.Limit1 ) {
                combinedClasses = baseClass + ' ' + "danger"
            } 
            else if( pctUt >= data.WarnPct && data.Util1 < data.Limit1 ) {
                combinedClasses = baseClass + ' ' + "warning"
            }
            else
            {
                combinedClasses = baseClass + ' ' + "normal"
            }

            return (

                <div className={ combinedClasses } key={i}>
                    <span style={ bar } className="bar"></span>
                    <div className="z-index2">
                        { !!data.DealcodeTo && !!data.DealcodeFrom && ( <div className="dealCode">From: { data.DealcodeTo } To: { data.DealcodeFrom }</div> ) }
                        <div className="creditPoolId">Credit Pool:<br /><span className="cPoolId">{ data.CreditPool }</span></div>
                        <div className="Util-Limit"><p>{ data.Util1 }</p><p>{ data.Limit1 }</p></div>
                    </div>
                </div>
            )
        })

      return (
            <div className="flex">
                { creditPoolItems }
            </div>
      )
   }
}

const mapStateToProps = state => ({
    login: state.login
})

const connected = connect( mapStateToProps )( LoginSuccess )

export default connected