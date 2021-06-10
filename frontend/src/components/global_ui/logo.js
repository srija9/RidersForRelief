import React from 'react';
import './logo.css'
/**
 * 
 * @returns ReliefRider's Logo
 */

const Logo = () => {
    return ( 
        <div className="logo-container" >        
        <img src={`/assets/logo.png`}  alt="Relief Riderslogo" />
        </div>
     );
}
 
export default Logo;