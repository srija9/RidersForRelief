/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState } from 'react';
import './verify_otp.css'
import InputField from '../../../global_ui/input'
import { AuthContext } from '../../../context/auth/authProvider';
import Spinner from '../../../global_ui/spinner';
import { verify } from '../../../context/auth/authOperations';
const VerifyOTP = () => {
    const [otp, setOtp] = useState('')
    const [error, setError] = useState({
        error: 'Please enter OTP',
        showError: false
    })
    const { dispatch, loading ,user} = useContext(AuthContext)
    const submit = async () => {
        setError({ ...error, showError: true })
        if (!error.error) {
            verify(dispatch,otp,user)
            
        }
        
    }
    const validateOTP = (otp) => {
        if (otp.length == 0) {
            setError({ ...error, error: "Please enter OTP" })

        }
        else if (otp.length < 6) {
            setError({ ...error, error: "OTP must contain 6 digits" })
        } else {
            setError({ ...error, error: "" })

        }
        setOtp(otp)
    }

    const goBack = () => {
        dispatch(
            {
                type: "SHOWFORM",
                action: null
            }
        )
    }

    return (
        <div className="otp-container">
            <span style={{ textAlign: 'center', marginBottom: 0.1 + 'em' }} >You will get an OTP via SMS</span>
            <InputField error={error.showError ? error.error : ""} textAlign="center" placeholder="Enter OTP" type="number" onChange={(e) => validateOTP(e.target.value)} />
            <span>
                Still haven't received the OTP ?  
                <button onClick={() => console.log("fff")} className="send-otp-btn">
                Resend OTP</button> 
            </span>
            <div style={{ margin:'0px'}}>
                {loading ?
                <Spinner radius="2"/> : 
                <button onClick={submit} className="verify-btn">Verify</button>}
            </div>          
            <p style={{ textAlign: 'center', marginBottom: 2 + 'em',marginTop:'0' }} >Entered wrong details <button onClick={goBack} className="go-back-reg" >Go back</button>  </p>
        </div >
    );
}

export default VerifyOTP;