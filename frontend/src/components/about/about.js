import React from 'react'
import './aboutStyles.css'

function About() {
    return (
        <div
        className="about"        
        >
            <nav 
            style={{
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
                   About Us
                </span>
            </nav> 

            <div>
            <blockquote
                style={{ 
                    textAlign:'center',
                    fontSize:'20px',                           
                    }}
                >
                Lorem ipsum dolor sit amet consectetur ipsum!
                </blockquote>
            </div>           

            <section 
            className="aboutContent"

            style={{
                backgroundImage: "url('/assets/logo.png')" ,
                backgroundSize:'contain',
                backgroundRepeat:'no-repeat',
                backgroundPosition:'center',
                padding:'20px',
                marginBottom:'30px'
            }}
            >
                

                <p 
                style={{
                    boxShadow: '2px #888888',
                    borderRadius:'5px',
                    maxWidth:'300px',
                    textAlign:'center',
                    backgroundColor:'grey', 
                    fontSize:'30px'               
                }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel porro, id magni exercitationem architecto asperiores iure consequuntur nesciunt facere. Voluptatibus minus ipsum eaque rerum laboriosam ex? Ab necessitatibus totam ratione.
                </p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus doloribus, eaque facere voluptatem voluptate veritatis animi nostrum eveniet blanditiis nulla delectus minima ab, est, deleniti cumque porro reiciendis ipsum quos.
            </section>

            <footer >
                <h2>Relief Riders</h2>
                <p className="footer-container-1">
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-facebook"></i>

                </p>
            </footer>
            
                                                        
        </div>
    )
}

export default About
