import React, { useState } from 'react'
import './loginStyles.css'
import Logo from '../../../global_ui/logo'
import InputField from '../../../global_ui/input';
import { useParams,Link } from 'react-router-dom'
import LoginHeader from './loginHeader';

function login() {
    const { loginType } = useParams();
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [showOTP, setShowOTP] = useState(false)

    
    
    const validate=(input)=>{
        const pattern =new RegExp(/^[6-9]\d{9}$/);
        if(mobile==''){
            setError("mobile number cannot be empty");
            return false;
        }
        if(!pattern.test(input)){
            setError("please enter a valid number");
            return false;
        }
        setError(null)
        return true; 
    }

    const handleLogin=(e)=>{
        setIsDisabled(true);
        setError(null);
        e.preventDefault();
        if(validate(mobile)){
            setError(null)
            console.log("");
            //succesful validation
            //login begins
            setShowOTP(true);
        }
        setIsDisabled(false)
        
    }
    return (        
        <div className="login">
            {
            /* Main Conditional 
            # Renders based on the type of user 
            #Renders Null if user type is not valid
            */
            }
            {
            (loginType=="rider" || loginType=="requester")?

                <div>
                    <Logo/>

                    {/*Renders OTPscreen when successfully validated */}
                    {
                    !showOTP?
                    <div className="content">

                        <LoginHeader type={loginType}/>

                        <form                 
                        action="" 
                        method="post" 
                        onSubmit={(e)=>handleLogin(e)}
                        noValidate>
                            <InputField 
                            type="number" 
                            placeholder="mobile"
                            error={ error?error:""}
                            value={ mobile }
                            maxLength="10000000000"
                            size="10"                        
                            onChange={ 
                                (e)=>setMobile(e.target.value)
                            }                    
                            />

                            <br/>
                            <input 
                            type="submit" 
                            value="Request OTP" 
                            className="btnStyle"
                            disabled={ isDisabled }
                            />  
                        </form>              
                        <p className="routetext">Dont have an account?</p>
                        <Link to={ "/register/"+loginType}>
                            <button 
                            className="btnStyle register">
                            Go to Registration
                            </button>                        
                        </Link>
                        
                    </div>
                    :<p>Login OTP</p>
                    }

                </div>            
            :null
            }          
        </div>            
    )
}

export default login
