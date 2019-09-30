import React from 'react';
import './FaceRecognition.css'

const createBoxDiv = (box, i) =>{
	if (!box){
		const elements = document.querySelectorAll('.bounding-box');
		console.log(elements);
		return "";
	}

	return (<div key= {i}
				 className='bounding-box grow'
		 		 style={{top: box.top_row,
		 		 		 right: box.right_col,
		 		 		 bottom: box.bottom_row,
		 		 		 left: box.left_col}}>
	 		 </div>)	 
}

const createBoxes = (boxes) => boxes.map((box,i) => createBoxDiv(box,i));

const FaceRecognition = ({imageURL, boxes}) => {
	return (
			<div className='center ma'>
				<div className='absolute mt2'>
					<img id='input_image' src={imageURL} alt='face recognition'
						 width='500px' height='auto'/>
					 	{createBoxes(boxes)}
				</div>
			</div>
		)
}

export default FaceRecognition;