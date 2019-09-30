import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return (
			<div>
				<p className="f3">
					{"This awesome app will detect faces in your images. Try it out!"}
				</p>
				<div className="center">
					<div className="form center pa4 br3 shadow-5">
						<input className="f4 pa2 w-70 center" type='text' onChange={onInputChange}/>
						<button className="f4 w-30 grow link ph3 pv2 dib white bg-orange" onClick={onButtonSubmit}> Detect </button>
					</div>
				</div>
			</div>
			)
	}

export default ImageLinkForm;