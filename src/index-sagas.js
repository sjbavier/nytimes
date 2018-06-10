import LoginSaga from './components/login-form/sagas'

export default function* IndexSaga (){
   yield [
        LoginSaga(),
   ]
}