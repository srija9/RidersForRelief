import React, { useContext, useEffect, useState } from 'react'
import './loginStyles.css'
import Logo from '../../../global_ui/logo'
import InputField from '../../../global_ui/input';
import VerifyOTP from '../otp/verify_otp';
import { AuthContext } from '../../../context/auth/authProvider';
import Spinner from '../../../global_ui/spinner';
import { Link } from 'react-router-dom';
import { requestOTPLogin } from '../../../context/auth/authOperations';

function Login({isRequester}) {
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState('');
    const {loading,showOTP,dispatch} = useContext(AuthContext)
    
    useEffect(()=>{
        if(!isRequester){
            dispatch({
                type: "ISRIDER", payload: null
            })
        }
    },[])

    const validate = (input) => {
        const pattern = new RegExp(/^[6-9]\d{9}$/);
        if (mobile == '') {
            setError("Mobile number cannot be empty");
            return false;
        }
        if (!pattern.test(input)) {
            setError("Please enter a valid number");
            return false;
        }
        setError(null)
        return true;
    }

    const handleLogin = (e) => {
        setError(null);
        e.preventDefault();
        if (validate(mobile)) {
            setError(null)
            if(isRequester){
                 requestOTPLogin(dispatch,mobile,"requester")
            }else{
                 requestOTPLogin(dispatch,mobile,"rider")
            }
            
        }

    }
    return (
        
            <div className="login">
                {/* Logo */}
                <Logo />

                {/*Form and Content*/}
                {
                    // eslint-disable-next-line no-constant-condition
                    !showOTP ?
                        <div className="content">
                            <h1> {isRequester?"Requester":"Rider"} Login</h1>

                            <InputField
                                style={{ marginTop:'10px'}}
                                textAlign="center"

                                type="text"
                                placeholder="Mobile"
                                error={error ? error : ""}
                                value={mobile}
                                maxLength="10"
                                onChange={
                                    (e) => setMobile(e.target.value)
                                }
                            />

                            <div style={{ margin:'20px'}}>
                                {loading ?
                                    <Spinner radius="2" /> : 
                                    <button
                                    type="submit"
                                    onClick={(e) => handleLogin(e)}
                                    className="btnStyle"
                                    >Request OTP</button>} 
                            </div>
                            
                                                 

                            
                                <p className="routetext">Dont have an account?</p>

                                <button
                                className="register"
                                > 
                                <Link to={isRequester?"/register/requester":"/register/rider"} >Go to Registration</Link>
                                </button>                       
                        </div>
                        : <VerifyOTP />
                }


            </div>
        
    )
}

export default Login
