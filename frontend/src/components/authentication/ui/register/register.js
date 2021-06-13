import React from 'react';
import Logo from '../../../global_ui/logo';
import Form from './register_form';
const RegisterScreen = ({isRequester}) => {

    
    return (
        <div style={{ marginTop:'20px'}}>
            <Logo />
            <Form isRequester={isRequester} />
        </div>
    );
}

export default RegisterScreen;