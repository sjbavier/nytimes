import LoginSaga from './components/login-form/sagas'
import SignupSaga from './components/create-account-form/sagas'
export default function* IndexSaga (){
   yield [
        LoginSaga(),
        SignupSaga(),
   ]
}