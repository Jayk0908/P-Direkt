import React from 'react'
import Image from '../images/StockImageSocialDrink.png'
import logo from '../images/logo_horizontal_final.png'
import {BrowserRouter as Router, Routes, Link} from 'react-router-dom'



export default function Homepage() {
    return (
        <>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

    <img src={logo} height='110px' width='auto'alt= 'main logo' />
    
        <div className="rectangle">
        
            <div className='container'> 
            
                <div className='mainText'>Ontmoet en inspireer je collega's onder het genot van een drankje!</div>
                
                <Link to="/Planjegesprek">
                    <button 
                    className='PlanGesprekButton'> <span>Plan je gesprek</span>
                    </button>
                </Link>
            
            </div>
        
        <img classname='coverImage' src={Image} height="100%" width='50%' alt='Stock foto' />
    
    </div>

    </>
    )
}
