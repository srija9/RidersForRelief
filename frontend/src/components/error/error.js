import React from 'react'
import ErrorLogo from './errorLogo'
import './errorStyles.css'
import { Link } from 'react-router-dom'

function Error() {
    return (
        <div className="errorPage">
            <nav style={{
                backgroundColor:'darkgreen',
                width:'100%',
                height:'60px',
                textAlign:'center',
                display:'grid',
                alignContent:'center',
                alignItems:'center',
                fontSize:'20px',
                color:'white'
                }}>
                    <span>
                    <i className="fas fa-circle icon"></i>
                    <i className="fas fa-circle icon"></i>
                    <i className="fas fa-circle icon"></i>
                    </span>
                </nav>

            <div className="error" >
                <h1 style={{color:'#1b5e20',fontSize:'50px',margin:'30px auto 10px auto'}}>Oops!</h1>
                <h2 style={{ margin:'20px auto 0px auto' }}>404 Error - Page Not Found</h2>
                <h3>The Page you requested cannot be found</h3>
                <p>Click <Link to="/">here</Link>
                </p>                
                <ErrorLogo/>                    
            </div>

        </div>
        
    )
}

export default Error
