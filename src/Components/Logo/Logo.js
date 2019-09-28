import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain_icon from './brain_icon.png';

const Logo = () => {
	return(
			<div className="ma4 mt0">
				<Tilt className="Tilt br4 shadow-2 pointer" options={{max:40}}
					  style={{height: "100px", width: "100px"}}>
			      <div className="Tilt-inner">
			      	<img src={brain_icon} alt="brain icon"/>
			      </div>
	    		</Tilt>
	    	</div>
		)

}

export default Logo;