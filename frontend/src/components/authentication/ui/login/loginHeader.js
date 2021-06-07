import React from 'react'

function LoginHeader(props) {
    const loginType=props.type;
    return (
        <div>
        {                            
            (loginType=="requester")?
            <h1>Requester Login</h1>:
            (loginType=="rider")?
            <h1>Rider Login</h1>:
            null
        }   
        </div>
    )
}

export default LoginHeader
